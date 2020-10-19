"use strict";
const dateHandler = require("../utils/dateHandler");

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					username: "brando",
					email: "brando@mail.com",
					password: "secret",
					createdAt: dateHandler.dateAndTime(),
					updatedAt: null,
				},
			],
			{},
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
