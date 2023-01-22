const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS =  require("crypto-js"); 


// REGISTER USER FROM SIGN UP
router.post("/register", async(req, res) => {
    const newUser =  new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
        profilePic: req.body.profilePic,
        isAdmin :req.body.isAdmin
    })

    try {
        const user =  await newUser.save()// javascript object notation;
        res.status(201).json(user); 
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
    
})

// LOG IN USER FROM SIGN IN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email : req.body.email});
        !user && res.status(401).json("Not found!")

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword =  bytes.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password){
            res.status(401).json("wrong password")
        }else{
            const accessToken = jwt.sign(
                {id : user._id, isAdmin : user.isAdmin}, 
                process.env.SECRET_KEY, 
                {expiresIn : "3d"})
            const {password, ...info} = user._doc;
            res.status(201).json({...info, accessToken})
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;
