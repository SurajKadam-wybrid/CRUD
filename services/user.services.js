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
  user.password = undefined;
  return user;
};

exports.findUserById = async (id) => {
  return await User.findById(id,'email name');
};

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  const checkPassword = await bcrypt.compare(password, user.password);
  
  if (!checkPassword) throw new Error("Invalid credentials");
  user.password = undefined;
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


exports.getAllUsers = async (page, limit, search) => {

  
  const query = {};
  
  if (search) {
    
      query.$or = [
          { name:  { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
      ];
    
  }

  const skip = (page - 1) * limit;

  const users = await User.find(query)
      .select('-password')   
      .skip(skip)           
      .limit(limit);         

  
  const total = await User.countDocuments(query);
 

  const totalPages = Math.ceil(total / limit);

  return {
      users,
      total,        
      totalPages,    
      currentPage: page,
      limit
  };
};