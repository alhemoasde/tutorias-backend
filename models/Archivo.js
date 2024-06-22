'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Archivo extends Model {
    static associate(models) {
      // Define relationships here if needed
    }
  }
  Archivo.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Entidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Id_Entidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ContentType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Archivo',
    tableName: 'Archivos',
    timestamps: false
  });
  return Archivo;
};
