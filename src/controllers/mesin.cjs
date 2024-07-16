const bcrypt = require('bcrypt');
const Mesin = require('../models/mesin.cjs');
const jwt = require('jsonwebtoken');
// API 'POST' for signing up or registering an account
exports.signup = async (req, res) => {
    try {
        const { username, password, merek_mesin } = req.body;
    
        if (!username || !password) {
            return res.status(400).json({ status: "error", error: "Please enter your username and password" });
        }
        const existingUser = await Mesin.findOne({ where: { username } });
    
        if (existingUser) {
            return res.status(400).json({ status: "error", error: "Username has already been registered" });
        }
    
        const hashedPassword = await bcrypt.hash(password, 8);
    
        const newUser = await Mesin.create({ username, email, password: hashedPassword, merek_mesin });
    
        const token = jwt.sign({ username: newUser.username }, process.env.SECRET_KEY);
        return res.status(200).json({ token: token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "error", error: "Internal server error" });
    }
    
};

// API 'POST' for logging into a registered account
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
    
        const mesin = await Mesin.findOne({ where: { username } });
    
        if (!mesin) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, mesin.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }

        const expires = 60 * 60 * 5;
        const token = jwt.sign({ username: mesin.username, expiresIn: expires }, process.env.SECRET_KEY);
        return res.status(200).json({ token: token });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};
exports.NameMesin = async (req, res) => {
  const { mesin_username } = req.user;
  console.log(mesin_username)

  try {
    const Merek_Mesin = await Mesin.findAll({
      where: {
        username: mesin_username,
      },
      attributes: ['merek_mesin']
    });
    return res.json({ status: "success", data: Merek_Mesin });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}
