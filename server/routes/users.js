const router = require('express').Router()
const {validateSignUpata, validateLoginData} = require('../validation')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require("dotenv").config();

router.get('/signup', (req, res)=>{
    res.status(401).json("Access denied")
})

//SIGNUP ENDPOINT
router.post('/signup', async (req, res)=>{
    const data = req.body;

    //lets validate data first     
    const {error} = validateSignUpata(data);
    if(error) return res.status(400).json(error.details[0].message);

    //check if user already exists
    const usernameExists = await User.findOne({username: data.username})
    if(usernameExists) return res.status(400).json("Username already exists!");

    const emailExists = await User.findOne({email: data.email})
    if(emailExists) return res.status(400).json("Email is already in use!");

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedpassword = bcrypt.hashSync(data.password, salt);

    //store data in DB
    const user = new User({
        username: data.username,
        email: data.email,
        password: hashedpassword
    });

    user.save((error, savedData) => {
        if(error){
            console.log('Storing data error', error);
            return res.status(400).json(error);
        } 
        res.status(201).json(savedData);
    });
})

//LOGIN ENDPOINT
router.post('/login', async(req, res)=>{
    const data = req.body;

    //lets validate data first 
    const {error} = validateLoginData(data)
    if(error) return req.status(400).json(error.details[0].message);
    
    //Check if user exists
    const user = await User.findOne({username: data.username});
    
    if(!user) return res.status(400).json("User is not found!")

    //check password 
    const validPassword = await bcrypt.compare(data.password, user.password)

    if(!validPassword) return res.status(400).json("Invalid password!")
    
    let token = jwt.sign({
        data: user.username
      }, process.env.MY_SECRET, { expiresIn: '1h' });
      
    res.status(200).json(token)
})

module.exports = router