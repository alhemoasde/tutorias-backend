"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Facturacion extends Model {
    static associate(models) {
      this.hasOne(models.Tutoria, {
        foreignKey: "id_facturacion",
      });
    }
  }
  Facturacion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      horas_tutoria: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      valor_hora: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      valor_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Facturacion",
      tableName: "Facturaciones",
      timestamps: true,
    }
  );
  return Facturacion;
};
