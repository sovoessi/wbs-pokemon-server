import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ username, password });
    const token = createToken(user);
    res.status(201).json({ token });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ error: 'Server error during registration' });
  }
};


export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = createToken(user);
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
