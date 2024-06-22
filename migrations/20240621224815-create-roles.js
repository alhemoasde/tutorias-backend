"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Roles", {
      Codigo: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      Descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Roles");
  },
};
