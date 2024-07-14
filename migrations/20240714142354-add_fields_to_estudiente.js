"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Estudiantes", "ciudad_ubicacion", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Estudiantes", "direccion", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Estudiantes", "ciudad_ubicacion");
    await queryInterface.removeColumn("Estudiantes", "direccion");
  },
};
