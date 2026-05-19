require('dotenv').config();
const express = require('express');
const connectDB = require('/Users/surajkadam/Desktop/CRUD/config/db.js');


const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use('/api/users',require('./routes/user.routes'));

connectDB();
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})  