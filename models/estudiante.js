'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Estudiante extends Model {
    static associate(models) {
      this.belongsTo(models.Usuario, {
        foreignKey: 'Id_Usuario'
      });
      this.hasMany(models.Tutoria, {
        foreignKey: 'Id_Estudiante'
      });
      this.hasMany(models.Calificaciones_Estudiantes, {
        foreignKey: 'Id_Estudiante'
      });
    }
  }
  Estudiante.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Telefono: DataTypes.STRING,
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Id_Usuario: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Estudiante',
    tableName: 'Estudiantes',
    timestamps: false
  });
  return Estudiante;
};
