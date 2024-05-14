const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userModel');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/netflixGpt-backend')

app.post('/api/register', async(req, res) => {
    console.log("--------", req.body);
    try{
        const registerUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        console.log("UUUUUU", registerUser);
        res.json({success: true, message: 'User registered Successfully', code: 'REGISTERED'})
    }
    catch(err){
        res.json({status: 'Error Occured', message: 'Already registered. Please login', err});
    }
    
})

app.post('/api/login', async (req, res) => {
    console.log("--------))))))", req.body);
    try{
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        console.log("KKKKKKKKKK", user);
        if (user) {
            const token = jwt.sign({
                name: user.name,
                email: user.email
            }, 'secret123')
            res.json({success: true, message: 'User LoggedIn Successfully', code: 'LOGGEDIN', accessToken: token})
        } else {
            res.json({success: true, message: 'Credentials not valid', code: 'INVALID_CREDENTIALS'})
        }
        return
    }
    catch(err){
        res.json({status: 'Error Occured', err});
    }
})


app.listen(1200, () => {
    console.log("Server started at 1200");
})