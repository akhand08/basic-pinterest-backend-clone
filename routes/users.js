// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pinterest");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: false
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts"
  }],
  dp: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  fullname: {
    type: String,
    required: true
  }
})

userSchema.plugin(plm);


module.exports = mongoose.model("users", userSchema);