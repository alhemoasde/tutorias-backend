"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Materias", {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Intensidad_Horaria: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      Nivel_Educativo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Materias");
  },
};
