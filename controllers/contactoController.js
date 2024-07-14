const { Contacto } = require("../models");

exports.getAllContactos = async (req, res) => {
  try {
    const contactos = await Contacto.findAll();
    if (contactos.length === 0) {
      res.status(404).json({
        error: "No existen contactos con los criterios consultados.",
      });
    } else {
      res.status(200).json({ contactos: contactos });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getContactoById = async (req, res) => {
  try {
    const contacto = await Contacto.findByPk(req.params.id);
    if (!contacto) {
      return res.status(404).json({ error: "Contacto no encontrada." });
    } else {
      res.status(200).json({ contacto: contacto });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createContacto = async (req, res) => {
  const { nombres, apellidos, email, mensaje } = req.body;
  try {
    if (!nombres || !apellidos || !email || !mensaje) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const contacto = await Contacto.create(req.body);

    res
      .status(201)
      .json({ contacto: contacto, message: "Contacto creada exitosamente." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteContacto = async (req, res) => {
  try {
    const contacto = await Contacto.findByPk(req.params.id);
    if (!contacto) {
      return res.status(404).json({ error: "Contacto no encontrado." });
    }
    await contacto.destroy();
    res.json({ message: "Contacto eliminada." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
