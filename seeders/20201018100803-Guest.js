"use strict";
const dateTimeHandler = require("../utils/dateTimeHandler");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Guests",
			[
				{
					userId: 1,
					firstname: "test-1",
					lastname: "test-1",
					address: "test address",
					lat: 3232.542,
					lon: 3233.32102,
					createdAt: dateTimeHandler.currentDateAndTime(),
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Guests", null, {});
	},
};
