"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.belongsToMany(models.Rol, {
        through: "UsuarioRoles",
        foreignKey: "Id_Usuario",
        otherKey: "Codigo_Rol",
      });
      this.hasOne(models.Estudiante, {
        foreignKey: "Id_Usuario",
      });
      this.hasOne(models.Tutor, {
        foreignKey: "Id_Usuario",
      });
    }
  }
  Usuario.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "Usuarios",
      timestamps: true
    }
  );
  return Usuario;
};
