
import User from '../model/authModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const valiPassword =  bcrypt.compareSync(password, user.password)
    if (!valiPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({
      id: user._id,
      isAdmin: user.isAdmin
    },
      process.env.SECRET_KEY,
      { expiresIn: '365d' });

    res.status(201).json({
      message: 'Login successful',
      status: 'success',
      data: { token,
        userName: user.userName,
        isAdmin: user.isAdmin,}
    });
  } catch (error) {
    next(error);
  }
};
