"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    static associate(models) {
      this.hasMany(models.TutoresMaterias, {
        foreignKey: "id_materia",
      });
      this.hasMany(models.Tutoria, {
        foreignKey: "id_materia",
      });
    }
  }
  Materia.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      intensidad_horaria: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nivel_educativo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Materia",
      tableName: "Materias",
      timestamps: true,
      freezeTableName: true,
    }
  );
  return Materia;
};
