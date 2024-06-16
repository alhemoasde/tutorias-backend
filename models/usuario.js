"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.UsuarioRol, { foreignKey: "Id_Usuario" });
      Usuario.hasOne(models.Tutor, { foreignKey: "Id_Usuario" });
      Usuario.hasOne(models.Estudiante, { foreignKey: "Id_Usuario" });
    }
  }
  Usuario.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      activo: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Usuario",
    }
  );
  return Usuario;
};
