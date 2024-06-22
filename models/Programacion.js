'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Programacion extends Model {
    static associate(models) {
      this.belongsTo(models.Disponibilidad, {
        foreignKey: 'Id_Disponibilidad'
      });
    }
  }
  Programacion.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Hora_Inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    Hora_Fin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    Id_Disponibilidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Programacion',
    tableName: 'Programaciones',
    timestamps: false
  });
  return Programacion;
};
