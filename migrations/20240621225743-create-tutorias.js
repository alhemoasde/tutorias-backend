"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tutorias", {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Fecha_Solicitud: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Estado: {
        type: Sequelize.STRING,
        allowNull: false,
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
      Id_Materia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Materias",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Id_Programacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Programaciones",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Id_Facturacion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Facturaciones",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tutorias");
  },
};
