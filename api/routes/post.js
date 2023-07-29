const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const { json } = require("express");


router.post("/",async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost =await newPost.save();
        res.status(200).json(savedPost);
        
    } catch (error) {
        res.status(500).json(error);
    }
 });

router.post("/friends_posts",async(req,res)=>{
    
     try{
        var posts = [];
        const user = await User.findOne({username: req.body.user});
        const friends = user.friends;
        var i = 0;
        var curr_posts = await Post.find({username: req.body.user});
        posts = posts.concat(curr_posts);
        for(i=0;i<friends.length;i++){
            curr_posts = await Post.find({username: friends[i]});
            posts = posts.concat(curr_posts);
        }
        res.status(200).json(posts);
     }catch(err){
        res.status(500).json(error);
     }
})

 module.exports = router;