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
      Id_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "Id",
        },
      },
      Codigo_Rol: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Rol",
          key: "Codigo",
        },
      },
    },
    {
      sequelize,
      modelName: "UsuarioRoles",
      tableName: "Usuario_Roles",
      timestamps: false,
    }
  );
  return UsuarioRoles;
};
