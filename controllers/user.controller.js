const  userServices = require('/Users/surajkadam/Desktop/CRUD/services/user.services.js');

exports.register = async(req,res) =>{
    try {
        const user = await userServices.createUser(req.body);
        res.status(201).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUser = async(req,res) =>{
    try{
        const user = await userServices.findUserById(req.params.id);
        res.status(200).json(user);
    }
    catch(error){
        res.status(404).json({message:'user not found'});
    }
};


