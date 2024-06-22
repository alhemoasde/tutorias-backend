'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tutoria extends Model {
    static associate(models) {
      this.belongsTo(models.Tutor, {
        foreignKey: 'Id_Tutor'
      });
      this.belongsTo(models.Estudiante, {
        foreignKey: 'Id_Estudiante'
      });
      this.belongsTo(models.Materia, {
        foreignKey: 'Id_Materia'
      });
      this.hasOne(models.Programacion, {
        foreignKey: 'Id_Programacion'
      });
      this.hasOne(models.Facturacion, {
        foreignKey: 'Id_Facturacion'
      });
    }
  }
  Tutoria.init({
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Fecha_Solicitud: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Id_Tutor: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_Estudiante: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_Materia: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Id_Programacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Id_Facturacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Tutoria',
    tableName: 'Tutorias',
    timestamps: false
  });
  return Tutoria;
};
