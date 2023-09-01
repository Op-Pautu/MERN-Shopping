const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const User = require('../models/User')

// REGISTER
router.post('/register', async(req,res)=> {
    const salt = await bcrypt.genSalt(10); 

    // Hash the user's password using the salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const newUser =  new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(err)
    }
})

// LOGIN
router.post('/login', async(req,res)=> {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
          }
      
          // Compare the provided password with the stored hashed password
          const passwordMatch = await bcrypt.compare(req.body.password, user.password);
          if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
          } 
          const {password, ...others} = user._doc;
          res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router