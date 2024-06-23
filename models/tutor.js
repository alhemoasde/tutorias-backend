"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "Id_Usuario",
      });
      this.hasMany(models.Tutoria, {
        foreignKey: "Id_Tutor",
      });
      this.hasMany(models.TutoresMaterias, {
        foreignKey: "Id_Tutor",
      });
      this.hasMany(models.SoportesAcademicos, {
        foreignKey: "Id_Tutor",
      });
      this.hasMany(models.Disponibilidad, {
        foreignKey: "Id_Tutor",
      });
      this.hasMany(models.CalificacionesTutores, {
        foreignKey: "Id_Tutor",
      });
    }
  }
  Tutor.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Telefono: DataTypes.STRING,
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Ciudad_Ubicacion: DataTypes.STRING,
      Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      Nivel_Educativo: DataTypes.STRING,
      Id_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tutor",
      tableName: "Tutores",
      timestamps: true,
    }
  );
  return Tutor;
};
