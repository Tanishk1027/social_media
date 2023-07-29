const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register",async(req,res)=>{
     const newUser = new User(req.body);
     try{
       await newUser.save();
       console.log("Registered Successfully");
       res.status(200).json("Registered Successfully");
    
     }catch(error){
         console.log(error);
     }
})

router.post("/login",async(req,res)=>{
  try{
      const user = await User.findOne({username: req.body.username});
      !user && res.status(400).json("user not found");

      if(user.password == req.body.password){
        res.status(200).json("Correct password");
      }
      else{
        res.status(200).json("Wrong credentials");
      }
  }catch(error){
     console.log(error);
  }
});

module.exports = router;