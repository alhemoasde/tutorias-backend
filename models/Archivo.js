'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Archivo extends Model {
    static associate(models) {
      // Define relationships here if needed
    }
  }
  Archivo.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    entidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_entidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contentType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Archivo',
    tableName: 'Archivos',
    timestamps: true
  });
  return Archivo;
};
