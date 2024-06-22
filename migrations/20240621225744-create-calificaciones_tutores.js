"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Calificaciones_Tutores", {
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
      Calificacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Comentario: {
        type: Sequelize.TEXT,
        allowNull: true,
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
      Id_Tutoria: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tutorias",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Calificaciones_Tutores");
  },
};
