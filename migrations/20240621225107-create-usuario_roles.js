"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Usuario_Roles", {
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
      Codigo_Rol: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Roles",
          key: "Codigo",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Usuario_Roles");
  },
};
