"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const Usuario = require("./Usuario");
const UsuarioRoles = require("./UsuarioRoles");
const Rol = require("./Rol");
const Estudiante = require("./Estudiante");
const Tutor = require("./Tutor");
const CalificacionesEstudiantes = require("./CalificacionesEstudiantes");
const CalificacionesTurores = require("./CalificacionesTutores");
const Disponibilidad = require("./Disponibilidad");
const Facturacion = require("./Facturacion");
const Materia = require("./Materia");
const Programacion = require("./Programacion");
const SoportesAcademicos = require("./SoportesAcademicos");
const TutoresMaterias = require("./TutoresMaterias");
const Tutoria = require("./Tutoria");
const Archivo = require("./Archivo");
const Contacto = require("./Contacto");
const Experiencia = require("./Experiencia");

const db = {
  Usuario,
  UsuarioRoles,
  Rol,
  Estudiante,
  Tutor,
  CalificacionesEstudiantes,
  CalificacionesTurores,
  Disponibilidad,
  Facturacion,
  Materia,
  Programacion,
  SoportesAcademicos,
  TutoresMaterias,
  Tutoria,
  Archivo,
  Contacto,
  Experiencia,
};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: config.dialect,
      define: {
        timestamps: true,
      },
    }
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Registrar asociaciones dinamicamente
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = require("sequelize");

module.exports = db;
