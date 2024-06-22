"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Facturaciones", {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Horas_Tutoria: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      Valor_Hora: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      Valor_Total: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Facturaciones");
  },
};
