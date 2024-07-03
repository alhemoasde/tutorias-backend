// Importa los modelos y módulos necesarios
const { UsuarioRoles } = require("../../models");

const getRolesUser = async (user) => {
  const userRoles = await UsuarioRoles.findAll({
    where: { id_usuario: user.id },
    attributes: ["codigo_rol"],
  });

  return userRoles.map((role) => role.codigo_rol);
};

module.exports = { getRolesUser };
