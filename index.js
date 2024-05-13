const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/userModel');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/netflixGpt-backend')

app.post('/api/register', async(req, res) => {
    console.log("--------", req.body);
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        return res.json({success: true, message: 'User registered Successfully', code: 'REGISTERED'})
    }
    catch(err){
        res.json({status: 'Error Occured', err});
    }
    
})

app.post('/api/login', async (req, res) => {
    console.log("--------))))))", req.body);
    try{
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })

        if (user) {
            return res.json({success: true, message: 'User LoggedIn Successfully', code: 'LOGGEDIN'})
        } else {
            return res.json({success: true, message: 'Credentials not valid', code: 'INVALID_CREDENTIALS'})
        }
    }
    catch(err){
        res.json({status: 'Error Occured', err});
    }
})


app.listen(1200, () => {
    console.log("Server started at 1200");
})