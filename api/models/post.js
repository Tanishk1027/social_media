const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    username:{
      type: String,
      required: true
    },
    desc:{
       type: String
    },
    photo:{
       type: String,
       required: false
    }
})

module.exports = mongoose.model("post",postSchema);