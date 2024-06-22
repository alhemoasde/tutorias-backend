"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class TutoresMaterias extends Model {
    static associate(models) {
      this.belongsTo(models.Tutor, {
        foreignKey: "Id_Tutor",
      });
      this.belongsTo(models.Materia, {
        foreignKey: "Id_Materia",
      });
    }
  }
  TutoresMaterias.init(
    {
      Id_Tutor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Id_Materia: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Costo_Hora_Tutoria: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TutoresMaterias",
      tableName: "Tutores_Materias",
      timestamps: false,
    }
  );
  return TutoresMaterias;
};
