"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Roles", {
      codigo: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(15),
        unique: true,
      },
      descripcion: {
        type: Sequelize.STRING(256),
        allowNull: true,
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

    // Insertar roles predeterminados
    await queryInterface.bulkInsert("Roles", [
      {
        codigo: "ESTUDIANTE",
        descripcion:
          "Rol especifico para los usuarios que quieran actuar como Estudiantes.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        codigo: "TUTOR",
        descripcion:
          "Rol especifico para los usuarios que quieran actuar como Tutores.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        codigo: "ADMIN",
        descripcion: "Rol especifico para el administrador del sistema.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Roles");
  },
};
