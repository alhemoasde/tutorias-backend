"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Programaciones", {
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
      Hora_Inicio: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      Hora_Fin: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      Id_Disponibilidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Disponibilidades",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Programaciones");
  },
};
