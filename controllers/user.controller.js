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

exports.login = async(req,res) =>{
    try{
        const{email,password} = req.body;
        const { user, token } = await userServices.loginUser(email, password);
        res.status(200).json({ success: true, token, user });
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
}


exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const loginid = req.user.id;
        if(id !== loginid){
            return res.status(403).json({ message: 'You dont have permission to update other user.' });         
    }
        const user = await userServices.updateUser(id, req.body);
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const loginid = req.user.id;
        if(id !== loginid){
                return res.status(403).json({ message: 'You dont have permission to delete other user.' });         
        }
        await userServices.deleteUser(id);
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {

        
        const page   = req.query.page   || 1;
       
        const limit  = req.query.limit  || 10;
      
        const search = req.query.search || '';
       
        const result = await userServices.getAllUsers(
            Number(page),
            Number(limit),
            search
        );

        res.status(200).json({
            success: true,
            ...result
  
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

