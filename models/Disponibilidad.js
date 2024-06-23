'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Disponibilidad extends Model {
    static associate(models) {
      this.belongsTo(models.Tutor, {
        foreignKey: 'id_tutor'
      });
      this.hasMany(models.Programacion, {
        foreignKey: 'id_disponibilidad'
      });
    }
  }
  Disponibilidad.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_tutor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo_sesion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Disponibilidad',
    tableName: 'Disponibilidades',
    timestamps: true
  });
  return Disponibilidad;
};
