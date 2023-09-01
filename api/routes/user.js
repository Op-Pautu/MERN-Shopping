const express = require('express')
const { verifyToken, verifyTokenAndAuthorization } = require('./verifyToken')
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router()


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

router.put("/:id", verifyTokenAndAuthorization, async(req, res) => {
    if (req.body.password) {
        // Generate the hashed password using the hashPassword function
        const hashedPassword = await hashPassword(req.body.password);
  
        // Update the request body with the hashed password
        req.body.password = hashedPassword;
      }
   try {
     const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
     }, {new: true})
     res.status(200).json(updatedUser)
   } catch (error) {
        res.status(500).json(error)
   }
})


module.exports = router