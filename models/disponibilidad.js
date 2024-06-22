'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Disponibilidad extends Model {
    static associate(models) {
      this.belongsTo(models.Tutor, {
        foreignKey: 'Id_Tutor'
      });
      this.hasMany(models.Programacion, {
        foreignKey: 'Id_Disponibilidad'
      });
    }
  }
  Disponibilidad.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Id_Tutor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Tpo_Sesion: {
      type: DataTypes.STRING,
      allowNull: false
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
    }
  }, {
    sequelize,
    modelName: 'Disponibilidad',
    tableName: 'Disponibilidades',
    timestamps: false
  });
  return Disponibilidad;
};
