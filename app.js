const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const rolRoutes = require('./routes/rolRoutes');
const tutorRoutes = require('./routes/tutorRoutes');

app.use(express.json());

app.use('/usuarios', usuarioRoutes);
app.use('/roles', rolRoutes);
app.use('/tutores', tutorRoutes);
// Otras rutas también se incluyen aquí

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;