const User = require('/Users/surajkadam/Desktop/CRUD/models/user.model.js');
const bcrypt = require('bcrypt');

exports.createUser = async(data) =>{
    const { name, email, password } = data; 
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, email, password: hashPassword
    });
    return user;
};


exports.findUserById = async(id) =>{
    return await User.findById(id);
};

exports.loginUser = async(data) => {
    const {email , password} =data;
    

   
}