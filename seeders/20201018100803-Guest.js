"use strict";
const dateHandler = require("../utils/dateHandler");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Guests",
			[
				{
					userId: 1,
					firstname: "juan",
					lastname: "dela cruz",
					address: "test address",
					lat: 3232.542,
					lon: 3233.32102,
					// createdAt: new Date(),
					// updatedAt: new Date(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Guests", null, {});
	},
};
