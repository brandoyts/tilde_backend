const moment = require("moment");
const db = require("../config/database");
const Guest = db.guest;
const sequelize = db.sequelize;
const { QueryTypes } = db.sequelize;

const addGuest = async (req, res) => {
	const newGuest = {
		UserId: req.userId,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		address: req.body.address,
		lat: req.body.lat,
		lon: req.body.lon,
	};

	try {
		await Guest.create(newGuest);

		res.status(201).json({
			message: "Guest added successfully!",
		});
	} catch (err) {
		res.status(400).json({
			error: err,
		});
	}
};

const getOverviewData = async (req, res) => {
	const date = moment().format("YYYY-M-D");
	const todayStart = moment().format("YYYY-M-D 00:00:00");
	const todayEnd = moment().format("YYYY-M-D 23:59:59");

	console.log(date);

	try {
		const guests = await sequelize.query(
			`SELECT 
			 SUM(createdAt BETWEEN '2020-10-18' AND '2020-10-19') as test, 
			 SUM(createdAt BETWEEN '2020-10-15' AND '2020-10-15') as x,
			 SUM(createdAt BETWEEN '2020-10-10' AND '2020-10-12') as e 
			 FROM users`,
			{
				type: sequelize.QueryTypes.SELECT,
			},
		);

		res.status(200).json({
			total: guests.length,
			data: guests,
		});
	} catch (err) {
		res.status(400).json({ error: err });
	}
};

module.exports = {
	addGuest,
	getOverviewData,
};
