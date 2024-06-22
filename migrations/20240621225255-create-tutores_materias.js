'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tutores_Materias', {
      Id_Tutor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tutores',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Id_Materia: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Materias',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Costo_Hora_Tutoria: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tutores_Materias');
  }
};
