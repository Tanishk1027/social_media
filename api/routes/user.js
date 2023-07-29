const User = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/request",async(req,res)=>{
    try{
        await User.updateOne({username : req.body.recevier }, { $push: { requests: req.body.sender }});
        res.status(200).json("request sent successfully");
    }catch(error){
        console.log(error);
    }
});

router.post("/accept",async(req,res)=>{
   try{
      await User.updateOne({username : req.body.recevier }, { $push: { friends: req.body.sender}});
      await User.updateOne({username : req.body.sender }, { $push: { friends: req.body.recevier}});
      await User.updateOne({username: req.body.recevier},{$pull:{requests: req.body.sender}});
      res.status(200).json("Request accepted");
   }catch(error){
    console.log(error);
   }
})
    
router.post("/decline",async(req,res)=>{
    try{
       await User.updateOne({username: req.body.recevier},{$pull:{requests: req.body.sender}});
       res.status(200).json("Request declined");
    }catch(error){
     console.log(error);
    }
 })

 router.post("/all_request",async(req,res)=>{
    try{
       const requests = await User.findOne({username: req.body.user})
       res.status(200).json(requests);
    }catch(error){
        console.log(error);
    }
 });

router.post("/all_friends",async(req,res)=>{
   try{
      const friends = await User.findOne({username: req.body.user});
      res.status(200).json(friends);
   }catch(error){
      console.log(error);
   }
});

module.exports = router;
