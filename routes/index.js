var express = require('express');
var router = express.Router();


const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index');

});

router.get("/profile", isLoggedIn, function(req, res) {
  res.send("Welcome to your Profile");
})


// register 

router.post("/register", function(req, res) {
  const {username, password, email, fullname} = req.body;
  let newUser = new userModel({username,  email, fullname});

  userModel.register(newUser, req.body.password)
  .then(function() {
    passport.authenticate("local")(req, res, function() {
      res.redirect("/profile");
    })
  })
  
})

// login

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req, res) {

})

// logout

router.get("/logout", function(req, res, next) {
  req.logOut(function(err) {
    if (err) {return next(err); }
    res.redirect("/");
  })
})



function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect("/");
}






















module.exports = router;
