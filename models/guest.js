"use strict";

const dateHandler = require("../utils/dateHandler");

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
			allowNull: false,
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			get() {
				const original = this.getDataValue("createdAt");
				const formatted = dateHandler
					.moment(original)
					.format("YYYY-M-D HH:mm:ss");
				return formatted;
			},
		},
	});

	console.log(dateHandler.dateAndTime());
	return Guest;
};

module.exports = Guest;
