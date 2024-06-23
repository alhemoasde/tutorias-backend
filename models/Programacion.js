'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Programacion extends Model {
    static associate(models) {
      this.belongsTo(models.Disponibilidad, {
        foreignKey: 'id_disponibilidad'
      });
    }
  }
  Programacion.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    id_disponibilidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Programacion',
    tableName: 'Programaciones',
    timestamps: true
  });
  return Programacion;
};
