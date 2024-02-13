import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) res.status(400).json({ msg: 'Password dan Confirm Password Tidak Cocok' });
  const salt = await bcrypt.genSalt();
  const hasPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name,
      email,
      password: hasPassword,
    });

    res.json({ msg: 'Register Berhasil' });
  } catch (error) {
    res.status(409).json({ msg: error.errors[0].message });
    console.error(error);
  }
};
