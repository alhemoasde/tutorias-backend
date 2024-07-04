"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CalificacionesTutores extends Model {
    static associate(models) {
      this.belongsTo(models.Tutoria, {
        foreignKey: "id_tutoria",
      });
      this.belongsTo(models.Tutor, {
        foreignKey: "id_tutor",
      });
    }
  }
  CalificacionesTutores.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      comentario: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      id_tutoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_tutor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CalificacionesTutores",
      tableName: "Calificaciones_Tutores",
      timestamps: true,
    }
  );
  return CalificacionesTutores;
};
