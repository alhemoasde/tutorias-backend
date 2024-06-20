const express = require('express');
const cors = require('cors'); // Importa cors
const app = express();
<<<<<<< HEAD

=======
const authRoutes = require('./routes/authRoutes');
>>>>>>> de6dc83b9e1cad4bd6257e2ae19811d373c8f587
const usuarioRoutes = require('./routes/usuarioRoutes');
const rolRoutes = require('./routes/rolRoutes');
const tutorRoutes = require('./routes/tutorRoutes');

app.use(express.json());
app.use(cors()); // Usa cors como middleware

app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/roles', rolRoutes);
app.use('/tutores', tutorRoutes);
<<<<<<< HEAD
// otras rutas también se incluyen aquí
=======
// Incluir otras rutas aquí
>>>>>>> de6dc83b9e1cad4bd6257e2ae19811d373c8f587

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado por el puerto ${PORT}`);
});

module.exports = app;
