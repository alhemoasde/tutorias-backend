"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CalificacionesTutores extends Model {
    static associate(models) {
      this.belongsTo(models.Tutoria, {
        foreignKey: "Id_Tutoria",
      });
      this.belongsTo(models.Tutor, {
        foreignKey: "Id_Tutor",
      });
    }
  }
  CalificacionesTutores.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      Calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Comentario: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Id_Tutoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Id_Tutor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CalificacionesTutores",
      tableName: "Calificaciones_Tutores",
      timestamps: false,
    }
  );
  return CalificacionesTutores;
};
