'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tutoria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_solicitud: {
        type: Sequelize.DATE
      },
      Id_Tutor: {
        type: Sequelize.INTEGER
      },
      Id_Estudiante: {
        type: Sequelize.INTEGER
      },
      Id_Materia: {
        type: Sequelize.INTEGER
      },
      Id_Disponibilidad: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tutoria');
  }
};