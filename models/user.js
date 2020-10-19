"use strict";

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
	});
	return User;
};

module.exports = User;
