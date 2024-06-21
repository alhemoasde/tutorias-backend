const express = require('express');
const cors = require('cors'); // Importa cors
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const rolRoutes = require('./routes/rolRoutes');
const tutorRoutes = require('./routes/tutorRoutes');

app.use(express.json());
app.use(cors()); // Usa cors como middleware

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/roles', rolRoutes);
app.use('/tutores', tutorRoutes);
// otras rutas también se incluyen aquí

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado por el puerto ${PORT}`);
});

module.exports = app;
