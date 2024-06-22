'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tutores', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Apellido: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Telefono: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Ciudad_Ubicacion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      Nivel_Educativo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Id_Usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Usuarios',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tutores');
  }
};
