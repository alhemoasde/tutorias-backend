'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Facturacion extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  Facturacion.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Horas_Tutoria: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Valor_Hora: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Valor_Total: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Facturacion',
    tableName: 'Facturaciones',
    timestamps: false
  });
  return Facturacion;
};
