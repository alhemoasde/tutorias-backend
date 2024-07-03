const { Usuario, UsuarioRoles, Tutor, Estudiante } = require("../models");
const { getRolesUser } = require("./utils/userRolesUtils");

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        //{ model: UsuarioRoles },
        { model: Tutor },
        { model: Estudiante },
      ],
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.params.id, {
      include: [{ model: Tutor }, { model: Estudiante }],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const user = await Usuario.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUsuarioRole = async (req, res) => {
  const { codigo_rol } = req.body;
  try {
    if (!req.params.id || !codigo_rol) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }
    const user = await Usuario.findByPk(req.params.id, {
      include: [
        {
          model: Estudiante,
          as: "Estudiante",
        },
        {
          model: Tutor,
          as: "Tutor",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si el usuario ya tiene el rol asignado
    const existingRoles = await getRolesUser(user);
    const hasRole = existingRoles.some((rol) => rol.codigo_rol === codigo_rol);

    if (!hasRole) {
      // Asignar roles al usuario
      await UsuarioRoles.create({
        id_usuario: user.id,
        codigo_rol: codigo_rol,
      });
      res.status(201).json({
        user: user,
        roles: await getRolesUser(user),
        message: `Rol -> ${codigo_rol} asignado exitosamente.`,
      });
    } else {
      return res.status(404).json({
        error: `El Usuario ya tiene asignado el Rol -> ${codigo_rol}`,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
