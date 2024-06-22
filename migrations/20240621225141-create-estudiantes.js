"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Estudiantes", {
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
      Apellido: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Telefono: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      Id_Usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Usuarios",
          key: "Id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Estudiantes");
  },
};
