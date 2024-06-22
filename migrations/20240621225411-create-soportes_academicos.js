"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Soportes_Academicos", {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Programa_Academico: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Institucion_Educativa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Tpo_Programa: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Area_Estudio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Condicion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Soporte_Documental: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Soportes_Academicos");
  },
};
