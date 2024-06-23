"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    static associate(models) {
      this.belongsToMany(models.Usuario, {
        through: "UsuarioRoles",
        foreignKey: "codigo_rol",
        otherKey: "id_usuario",
      });
    }
  }
  Rol.init(
    {
      codigo: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      descripcion: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "Roles",
      timestamps: true
    }
  );
  return Rol;
};
