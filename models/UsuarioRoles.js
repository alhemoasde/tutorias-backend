"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UsuarioRoles extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }
  UsuarioRoles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "id",
        },
      },
      codigo_rol: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Rol",
          key: "codigo",
        },
      },
    },
    {
      sequelize,
      modelName: "UsuarioRoles",
      tableName: "Usuario_Roles",
      timestamps: true,
    }
  );
  return UsuarioRoles;
};
