const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const multer = require("multer");
const path = require("path");


mongoose.connect("mongodb+srv://Tanishk:sL7Jiha3FCLmwh7@cluster0.gehhe.mongodb.net/Socialmedia?retryWrites=true&w=majority", { useNewUrlParser: true }).then(console.log("Connected to database")).catch((err) => console.log(err));

app.use("/images",express.static(path.join(__dirname,"/images")));


const cors = require("cors");

app.use(cors());



app.use(express.json());


const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"images");
    },filename:(req,file,cb)=>{
       cb(null,req.body.name);
    }
 });

 const upload = multer({storage: storage});
   app.post("/upload",upload.single("file"),(req,res)=>{
       res.status(200).json("File has been uploaded");
   });

app.use("/auth",authRoute);
app.use("/user",userRoute);
app.use("/post",postRoute);

app.listen("5000",(req,res)=>{
    console.log("success");
})