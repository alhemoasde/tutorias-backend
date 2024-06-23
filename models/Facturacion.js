'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Facturacion extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Facturacion.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    horas_tutoria: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    valor_hora: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    valor_total: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Facturacion',
    tableName: 'Facturaciones',
    timestamps: true
  });
  return Facturacion;
};
