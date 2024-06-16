"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UsuarioRol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UsuarioRol.belongsTo(models.Usuario, { foreignKey: "Id_Usuario" });
      UsuarioRol.belongsTo(models.Rol, { foreignKey: "Codigo_Rol" });
    }
  }
  UsuarioRol.init(
    {
      Id_Usuario: DataTypes.INTEGER,
      Codigo_Rol: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UsuarioRol",
    }
  );
  return UsuarioRol;
};
