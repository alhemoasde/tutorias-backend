"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tutoria extends Model {
    static associate(models) {
      this.belongsTo(models.Tutor, {
        foreignKey: "id_tutor",
      });
      this.belongsTo(models.Estudiante, {
        foreignKey: "id_estudiante",
      });
      this.belongsTo(models.Materia, {
        foreignKey: "id_materia",
      });
      this.belongsTo(models.Programacion, {
        foreignKey: "id_programacion",
      });
      this.belongsTo(models.Facturacion, {
        foreignKey: "id_facturacion",
      });
    }
  }
  Tutoria.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fecha_solicitud: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Creada",
      },
      id_tutor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_estudiante: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_materia: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_programacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_facturacion: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Tutoria",
      tableName: "Tutorias",
      timestamps: true,
    }
  );
  return Tutoria;
};
