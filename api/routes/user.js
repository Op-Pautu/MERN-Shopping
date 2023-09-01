const express = require('express')
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router()


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

// GET USER
router.get("/find/:id", verifyTokenAndAdmin, async(req,res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others}  = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})  

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async(req,res) => {
    const query = req.query.new
    try {
        const users = query 
        ? await User.find().sort({_id: -1}).limit(5)
        : await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
})  

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

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async(req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router