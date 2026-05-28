const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/user.model');

const users = [
    { name: 'Rahul Sharma',   email: 'rahul@gmail.com',   password: 'Test@123' },
    { name: 'Suraj Kadam',    email: 'suraj@gmail.com',   password: 'Test@123' },
    { name: 'Amit Patil',     email: 'amit@gmail.com',    password: 'Test@123' },
    { name: 'Priya Singh',    email: 'priya@gmail.com',   password: 'Test@123' },
    { name: 'Rohit Verma',    email: 'rohit@gmail.com',   password: 'Test@123' },
    { name: 'Neha Joshi',     email: 'neha@gmail.com',    password: 'Test@123' },
    { name: 'Vikas Gupta',    email: 'vikas@gmail.com',   password: 'Test@123' },
    { name: 'Pooja Mehta',    email: 'pooja@gmail.com',   password: 'Test@123' },
    { name: 'Karan Shah',     email: 'karan@gmail.com',   password: 'Test@123' },
    { name: 'Sneha Desai',    email: 'sneha@gmail.com',   password: 'Test@123' },
    { name: 'Arjun Nair',     email: 'arjun@gmail.com',   password: 'Test@123' },
    { name: 'Divya Iyer',     email: 'divya@gmail.com',   password: 'Test@123' },
    { name: 'Raj Malhotra',   email: 'raj@gmail.com',     password: 'Test@123' },
    { name: 'Anita Reddy',    email: 'anita@gmail.com',   password: 'Test@123' },
    { name: 'Sanjay Pillai',  email: 'sanjay@gmail.com',  password: 'Test@123' },
    { name: 'Meera Nambiar',  email: 'meera@gmail.com',   password: 'Test@123' },
    { name: 'Aakash Tiwari',  email: 'aakash@gmail.com',  password: 'Test@123' },
    { name: 'Ritu Agarwal',   email: 'ritu@gmail.com',    password: 'Test@123' },
    { name: 'Deepak Kumar',   email: 'deepak@gmail.com',  password: 'Test@123' },
    { name: 'Kavya Menon',    email: 'kavya@gmail.com',   password: 'Test@123' },
    { name: 'Nikhil Jain',    email: 'nikhil@gmail.com',  password: 'Test@123' },
    { name: 'Shruti Pandey',  email: 'shruti@gmail.com',  password: 'Test@123' },
    { name: 'Varun Saxena',   email: 'varun@gmail.com',   password: 'Test@123' },
    { name: 'Ankita Bose',    email: 'ankita@gmail.com',  password: 'Test@123' },
    { name: 'Manish Yadav',   email: 'manish@gmail.com',  password: 'Test@123' },
];

const seedDB = async () => {
    try {
        // Step 1 — connect to DB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        // Step 2 — delete all existing users
        await User.deleteMany({});
        console.log('Existing users deleted');

        // Step 3 — hash all passwords
        const hashedUsers = await Promise.all(
            users.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }))
        );
        //  ↑ Promise.all runs all hashing at same time
        //    instead of one by one (faster!)

        // Step 4 — insert all users at once
        await User.insertMany(hashedUsers);
        console.log('25 users inserted successfully!');

    } catch (error) {
        console.error('Seed failed:', error.message);
    } finally {
        // Step 5 — disconnect after done
        await mongoose.disconnect();
        console.log('MongoDB disconnected');
    }
};

seedDB();