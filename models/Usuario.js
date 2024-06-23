"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      this.belongsToMany(models.Rol, {
        through: "UsuarioRoles",
        foreignKey: "id_usuario",
        otherKey: "codigo_rol",
      });
      this.hasOne(models.Estudiante, {
        foreignKey: "id_Usuario",
      });
      this.hasOne(models.Tutor, {
        foreignKey: "id_usuario",
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
