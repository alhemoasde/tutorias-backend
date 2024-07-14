'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experiencia extends Model {
    static associate(models) {
      this.belongsTo(models.Tutor, {
        foreignKey: 'id_tutor'
      });
    }
  }
  Experiencia.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contratante: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_salida: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    experiencia_docente: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    actual: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    id_tutor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tutor',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }, {
    sequelize,
    modelName: 'Experiencia',
    tableName: 'Experiencias',
    timestamps: true
  });
  return Experiencia;
};