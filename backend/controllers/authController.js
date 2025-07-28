import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// @desc    Registra un nuovo utente
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Utente già esistente' });
    }

    const user = await User.create({ username, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ _id: user._id, username, email, token });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};

// @desc    Autentica utente
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    const token = generateToken(user._id);
    res.json({ _id: user._id, username: user.username, email, token });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};

// Genera JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};