"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: "id_usuario",
      });
      this.hasMany(models.Tutoria, {
        foreignKey: "id_tutor",
      });
      this.hasMany(models.TutoresMaterias, {
        foreignKey: "id_tutor",
      });
      this.hasMany(models.SoportesAcademicos, {
        foreignKey: "id_tutor",
      });
      this.hasMany(models.Disponibilidad, {
        foreignKey: "id_tutor",
      });
      this.hasMany(models.CalificacionesTutores, {
        foreignKey: "id_tutor",
      });
      this.hasMany(models.Experiencia, {
        foreignKey: 'id_tutor',
        as: 'experiencias',
      });
    }
  }
  Tutor.init(
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
      nivel_educativo: DataTypes.STRING,
      id_usuario: {
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
