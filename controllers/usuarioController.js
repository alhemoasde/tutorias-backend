const { Usuario, UsuarioRoles, Tutor, Estudiante } = require("../models");

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