const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Silakan Login Terlebih Dahulu' });
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // Menyimpan username dari token JWT ke dalam objek pengguna (req.user)
    req.user = {
      mesin_username: decoded.username // Menggunakan decoded.username
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak Valid' });
  }
};

module.exports = authorize;
