"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
      });
      this.hasMany(models.Tutoria, {
        foreignKey: "id_estudiante",
      });
      this.hasMany(models.CalificacionesEstudiantes, {
        foreignKey: "id_estudiante",
      });
    }
  }
  Estudiante.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      telefono: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ciudad_ubicacion: DataTypes.STRING,
      direccion: DataTypes.STRING,
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Estudiante",
      tableName: "Estudiantes",
      timestamps: true,
    }
  );
  return Estudiante;
};
