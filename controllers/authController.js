const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuario, Tutor, Estudiante, UsuarioRoles } = require("../models");

// Clave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET;
const ROL_TUTOR = "TUTOR";
const ROL_ESTUDIANTE = "ESTUDIANTE";

// Registro de usuario
exports.register = async (req, res) => {
  const { prospecto, password, codigo_rol } = req.body;
  let roles = [];

  try {
    if (!prospecto || !password || !codigo_rol) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const user = await generarUser(prospecto.email, password);
    if (!user) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Asignar roles al usuario
    await UsuarioRoles.create({
      id_usuario: user.id,
      codigo_rol: codigo_rol,
    });

    if (codigo_rol.toUpperCase() === ROL_TUTOR) {
      if (!prospecto.ciudad_ubicacion || !prospecto.nivel_educativo) {
        return res
          .status(400)
          .json({ error: "Faltan campos requeridos del Tutor" });
      }
      // Crear nuevo Tutor
      const tutor = await Tutor.create({
        nombre: prospecto.nombre,
        apellido: prospecto.apellido,
        telefono: prospecto.telefono,
        email: prospecto.email.toLowerCase(),
        ciudad_ubicacion: prospecto.ciudad_ubicacion,
        nivel_educativo: prospecto.nivel_educativo,
        activo: true,
        id_usuario: user.id,
      });
    } else if (codigo_rol.toUpperCase() === ROL_ESTUDIANTE) {
      // Crear nuevo Estudiante
      const estudiante = await Estudiante.create({
        nombre: prospecto.nombre,
        apellido: prospecto.apellido,
        telefono: prospecto.telefono,
        email: prospecto.email.toLowerCase(),
        activo: true,
        id_usuario: user.id,
      });
    } else {
      return res
        .status(400)
        .json({ error: "Rol no valido para registrar el usuario." });
    }

    // Generar token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      token: token,
      userResponse: {
        id: user.id,
        username: user.username,
        roles: await getRolesUser(user),
      },
      message: "Usuario registrado exitosamente",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await Usuario.findOne({ where: { username } });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: "Usuario o contraseña incorrectos" });
    }

    // Generar token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      token: token,
      userResponse: {
        id: user.id,
        username: user.username,
        roles: await getRolesUser(user),
      },
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Permite guardar los atributos del usuario y retornarlo
// para ser asignado al registro de Tutor o Estudiantes según corresponda.
const generarUser = async (username, password) => {
  // Verificar si el usuario ya existe
  const existingUser = await Usuario.findOne({ where: { username } });
  if (existingUser) {
    return null;
  }

  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
  const user = await Usuario.create({
    username,
    password: hashedPassword,
    activo: true,
  });

  return user;
};

const getRolesUser = async (user) => {
  const userRoles = await UsuarioRoles.findAll({
    where: { id_usuario: user.id },
    attributes: ["codigo_rol"],
  });

  const roles = [];

  // Iterar sobre cada objeto userRoles y agregar cada codigo_rol al array roles
  userRoles.forEach((role) => {
    roles.push(role.codigo_rol);
  });

  return roles;
};
