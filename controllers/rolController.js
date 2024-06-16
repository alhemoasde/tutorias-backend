const { Rol } = require("../models");

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRolById = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: "Rol not found" });
    }
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createRol = async (req, res) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: "Rol not found" });
    }
    await rol.update(req.body);
    res.json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) {
      return res.status(404).json({ error: "Rol not found" });
    }
    await rol.destroy();
    res.json({ message: "Rol deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
