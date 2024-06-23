const { Usuario, UsuarioRoles } = require("../models");

const authorizationMiddleware = (requiredRole) => async (req, res, next) => {
  try {
    const roles = await getRolesUser(req.user);
    // Verificar si el usuario tiene un rol adecuado
    const hasRole = roles.some((role) => requiredRole.includes(role));

    if (hasRole) {
      // Si tiene el rol necesario, permitir acceso
      next();
    } else {
      // Si no tiene el rol adecuado, denegar acceso
      return res
        .status(403)
        .json({ error: "No tiene permisos suficientes para esta acción." });
    }
  } catch (error) {
    console.error("Error de autorización:", error);
    return res.status(500).json({ error: "Error de servidor." });
  }
};

const getRolesUser = async (user) => {
  const userRoles = await UsuarioRoles.findAll({
    where: { id_usuario: user.id },
    attributes: ["codigo_rol"],
  });

  const roles = [];

  // Iterar sobre cada objeto userRoles y agregar cada codigo_rol al array roles
  userRoles.forEach((role) => {
    roles.push(role.codigo_rol);
  });

  return roles;
};

module.exports = authorizationMiddleware;
