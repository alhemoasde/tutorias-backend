"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Experiencias", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      contratante: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cargo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      fecha_salida: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      experiencia_docente: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      actual: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      id_tutor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tutores",
          key: "id",
        },
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Experiencias");
  },
};
