"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Archivos", {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Entidad: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Id_Entidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ContentType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Archivos");
  },
};
