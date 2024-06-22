"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {
      this.belongsToMany(models.Usuario, {
        through: "UsuarioRoles",
        foreignKey: "Codigo_Rol",
        otherKey: "Id_Usuario",
      });
    }
  }
  Rol.init(
    {
      Codigo: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      Descripcion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "Roles",
      timestamps: false,
    }
  );
  return Rol;
};
