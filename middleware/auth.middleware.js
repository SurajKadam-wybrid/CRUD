const jwt = require('jsonwebtoken');

const middleware = (req,res,next) =>{
    console.log("middleware added");
    const tokenHeader = req.headers.authorization;
    if (!tokenHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = tokenHeader.split(' ')[1];


    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

}

module.exports = middleware;