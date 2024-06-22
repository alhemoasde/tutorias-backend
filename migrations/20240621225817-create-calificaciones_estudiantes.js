"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Calificaciones_Estudiantes", {
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
      Id_Estudiante: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Estudiantes",
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
    await queryInterface.dropTable("Calificaciones_Estudiantes");
  },
};
