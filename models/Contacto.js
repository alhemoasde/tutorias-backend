"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contacto extends Model {
    static associate(models) {
      // define association here
    }
  }
  Contacto.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombres: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mensaje: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Contacto",
      tableName: "Contactos",
      timestamps: true,
    }
  );
  return Contacto;
};
