const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario, Rol, Tutor, Estudiante } = require('../models');

// Clave secreta para JWT
const JWT_SECRET = 'NewApp_Dev_Agil_Group';
const ROL_TUTOR = 'TUTOR';
const ROL_ESTUDIANTE = 'ESTUDIANTE'

// Registro de usuario
exports.register = async (req, res) => {
  const { username, password, codigo_rol} = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await Usuario.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    if(codigo_rol===ROL_TUTOR){

    }else if(codigo_rol===ROL_ESTUDIANTE){

    }else{
      return res.status(400).json({ error: 'Rol no valido para registrar el usuario.' });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const user = await Usuario.create({
      username,
      password: hashedPassword,
      activo: true 
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
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
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Generar token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
