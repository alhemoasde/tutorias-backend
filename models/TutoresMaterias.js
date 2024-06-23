"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TutoresMaterias extends Model {
    static associate(models) {
      this.belongsTo(models.Tutor, {
        foreignKey: "id_tutor",
      });
      this.belongsTo(models.Materia, {
        foreignKey: "id_materia",
      });
    }
  }
  TutoresMaterias.init(
    {
      id_tutor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_materia: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      costo_hora_tutoria: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TutoresMaterias",
      tableName: "Tutores_Materias",
      timestamps: true
    }
  );
  return TutoresMaterias;
};
