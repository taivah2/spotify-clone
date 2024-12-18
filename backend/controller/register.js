import User from '../model/authModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
export const register = async (req, res, next) => {
  try {
    const { userName, email, password,isAdmin } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const existingCustomer = await User.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    

    const newUser = await User.create({
      userName,
      email,
      password: hash,
      isAdmin: isAdmin || false,
    })
    await newUser.save();

    const token = jwt.sign({
      id: newUser._id,
      userName: newUser.userName,
      isAdmin: newUser.isAdmin
    },
      process.env.SECRET_KEY,
      { expiresIn: '365d' });

    res.status(201).json({
      message: 'Registered successfully!',
      status: 'success',
      data: {message: 'Token',token, 'isAdmin': isAdmin,

    }
    });
  } catch (error) {
    next(error);
  }
};

