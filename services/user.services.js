const User = require("/Users/surajkadam/Desktop/CRUD/models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (data) => {
  const { name, email, password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  return user;
};

exports.findUserById = async (id) => {
  return await User.findById(id);
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) throw new Error("Invalid credentials");
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  return { user, token };
};

exports.updateUser = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  if (!user) throw new Error("User not found");
  return user;
};

exports.deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) throw new Error("User not found");
  return user;
};
