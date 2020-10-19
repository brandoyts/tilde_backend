"use strict";
const moment = require("moment");

const Guest = (sequelize, DataTypes) => {
	const Guest = sequelize.define("Guest", {
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lat: DataTypes.FLOAT,

		lon: DataTypes.FLOAT,
		createdAt: {
			type: DataTypes.NOW,
			defaultValue: moment().format("YYYY-M-D hh:mm:ss"),
		},
	});
	return Guest;
};

module.exports = Guest;
