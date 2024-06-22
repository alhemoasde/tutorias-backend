"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Disponibilidades", {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Id_Tutor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tutores",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Tpo_Sesion: {
        type: Sequelize.STRING,
        allowNull: false,
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Disponibilidades");
  },
};
