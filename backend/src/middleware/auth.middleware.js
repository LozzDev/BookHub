const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware para verificar el JWT desde cookies HTTP-only.
 */
function authMiddleware(req, res, next) {
  const token = req.cookies.token; // ⚠️ Token viene de las cookies, NO del header

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guarda los datos del usuario en la request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;
