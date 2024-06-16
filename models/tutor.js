"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tutor.belongsTo(models.Usuario, { foreignKey: "Id_Usuario" });
      Tutor.belongsTo(models.NivelEducativo, {
        foreignKey: "Id_Nivel_Educativo",
      });
      Tutor.hasMany(models.Disponibilidad, { foreignKey: "Id_Tutor" });
      Tutor.hasMany(models.TutorMateria, { foreignKey: "Id_Tutor" });
    }
  }
  Tutor.init(
    {
      nombre: DataTypes.STRING,
      apellido: DataTypes.STRING,
      telefono: DataTypes.STRING,
      email: DataTypes.STRING,
      ciudad_ubicacion: DataTypes.STRING,
      activo: DataTypes.BOOLEAN,
      Id_Nivel_Educativo: DataTypes.INTEGER,
      Id_Usuario: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Tutor",
    }
  );
  return Tutor;
};
