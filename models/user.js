"use strict";
const dateHandler = require("../utils/dateHandler");

const User = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.NOW,
			defaultValue: dateHandler.dateAndTime(),
		},
	});
	return User;
};

module.exports = User;
