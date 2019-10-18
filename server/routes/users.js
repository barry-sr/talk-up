const router = require('express').Router()
const {validateSignUpata, validateLoginData} = require('../validation')
const User = require('../model/User')
const bcrypt = require('bcrypt');

router.get('/signup', (req, res)=>{
res.send("signup")
})

//SIGNUP ENDPOINT
router.post('/signup', async (req, res)=>{
    console.log(req.body)
    
    //lets validate data first 
    const {error} = validateSignUpata(req.body);

    console.log("validate error:",error)
    if(error) return res.status(400).json(error);

    //Check if user exists
    const usernameExist = await User.findOne({username: req.body.username});
    
    if(usernameExist) return res.status(400).json("Username already exists")

    const emailExist = await User.findOne({email: req.body.email});
    
    if(emailExist) return res.status(400).json("Email is already in use")

    //Hash the password
    const salt = bcrypt.genSalt(10)
    const hashPassword = bcrypt.hash(data.body.password, salt)

    //Create new user
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const saveUser = await user.save()
        saveUser.status(201).json({user: user._id})
    } catch (error) {
        console.log("storing user error:",error)
        res.status(400).send(error)
    }
})

//LOGIN ENDPOINT
router.post('/login', async(req, res)=>{
    //lets validate data first 
    const {error} = validateLoginData(req.body)
    console.log("validate error:",error)
    if(error) return res.status(400).json(error)

    //Check if user exists
    const user = await User.findOne({username: req.body.username});
    
    if(!user) return res.status(400).json("User is not found!")

    //check password 
    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword) return res.status(400).json("Invalid password!")

    res.status(201).json("success")

})

module.exports = router