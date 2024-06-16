const { Usuario, UsuarioRol, Tutor, Estudiante } = require('../models');

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        { model: UsuarioRol },
        { model: Tutor },
        { model: Estudiante }
      ]
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Otros métodos como getUsuarioById, createUsuario, updateUsuario, deleteUsuario también se implementan aquí
