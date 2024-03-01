var express = require('express');
var router = express.Router();

const passport = require("passport")

const userModel = require("./users");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post("/register", function(req, res) {
  const {username, password, email, fullname} = req.body;
  let newUser = new userModel.create({username, email, fullname});

  userModel.register(newUser, password)
  .then(function() {
    passport.authenticate("local")(req, res, function {
      res.redirect("/profile");
    })
  })
 
})




















module.exports = router;
