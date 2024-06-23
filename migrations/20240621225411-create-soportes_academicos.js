"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Soportes_Academicos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      programa_academico: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      institucion_educativa: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      tipo_programa: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      area_estudio: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      condicion: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      soporte_documental: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      id_tutor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tutores",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Soportes_Academicos");
  },
};
