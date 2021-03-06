const db = require("../config/database");
const dateHandler = require("../utils/dateHandler");
const { Op } = db.Sequelize;
const nodeGeoCoder = require("node-geocoder");

const geoCoderOptions = {
  provider: "here",
  apiKey: process.env.MAP_API_KEY,
};

const geoCoder = nodeGeoCoder(geoCoderOptions);

const addGuest = async (req, res) => {
  const newGuest = {
    UserId: req.userId, // client id
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    address: req.body.address,
  };

  try {
    const geoResponse = await geoCoder.geocode(newGuest.address);
    const { latitude, longitude } = geoResponse[0];

    newGuest.lat = latitude;
    newGuest.lon = longitude;

    await db.guest.create(newGuest);

    res.status(201).json({
      message: "Guest added successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err,
    });
  }
};

const getOverviewData = async (req, res) => {
  const date = dateHandler.dateOnly();
  const dayStart = dateHandler.moment().format("YYYY-M-D 07:00:00");
  const dayEnd = dateHandler.moment().format("YYYY-M-D 23:59:59");

  try {
    const graphicalData = await db.sequelize.query(
      `SELECT
			 CAST(SUM(createdAt BETWEEN "${date} 07:00:00" AND "${date} 09:59:59") as INTEGER) as "guest7AmTo9Am",
			 CAST(SUM(createdAt BETWEEN "${date} 10:00:00" AND "${date} 12:59:59") as INTEGER) as "guest10AmTo12Pm",
			 CAST(SUM(createdAt BETWEEN "${date} 13:00:00" AND "${date} 15:59:59") as INTEGER) as "guest1PmTo3Pm",
			 CAST(SUM(createdAt BETWEEN "${date} 16:00:00" AND "${date} 18:59:59") as INTEGER) as "guest4PmTo6Pm",
			 CAST(SUM(createdAt BETWEEN "${date} 19:00:00" AND "${date} 21:59:59") as INTEGER) as "guest7PmTo9Pm",
			 CAST(SUM(createdAt BETWEEN "${date} 22:00:00" AND "${date} 23:59:59") as INTEGER) as "guest10PmTo12Am"
			 FROM guests
			 WHERE UserId = ${req.userId} group by UserId`,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );

    const guestsData = await db.guest.findAll({
      where: {
        [Op.and]: [
          { createdAt: { [Op.between]: [dayStart, dayEnd] } },
          { UserId: req.userId },
        ],
      },
      attributes: {
        exclude: ["updatedAt"],
      },
    });

    res.status(200).json({
      totalGuest: guestsData.length,
      guestsData,
      graphicalData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

const traceGuest = async (req, res) => {
  try {
    const guests = await db.guest.findAll({
      where: {
        UserId: req.userId,
      },
    });

    res.status(200).json({
      message: "success",
      length: guests.length,
      guests,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
    });
  }
};

module.exports = {
  addGuest,
  getOverviewData,
  traceGuest,
};
