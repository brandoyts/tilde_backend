const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_DIALECT,
		timezone: "Asia/Bangkok",
	},
);

// CHECK IF CONNECTION IS SUCCESS
// async function dbConnect() {
// 	try {
// 		await sequelize.authenticate();
// 		console.log("Connection has been established successfully.");
// 	} catch (error) {
// 		console.error("Unable to connect to the database:", error);
// 	}
// }

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user")(sequelize, Sequelize);
db.guest = require("../models/guest")(sequelize, Sequelize);

db.user.hasMany(db.guest);
db.guest.belongsTo(db.user);

// CREATE ALL TABLE (FORCE)
// sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and re-sync db.");
// });

module.exports = db;
