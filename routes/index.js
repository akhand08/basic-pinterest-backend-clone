var express = require('express');
var router = express.Router();


const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
const upload = require("./multer")


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('index');

});

router.get("/profile", isLoggedIn, function(req, res) {
  res.render("profile");
})

router.get("/login", function(req, res) {
  console.log(req.flash("user"));
  res.render("login", {error: req.flash("error")});
})


router.get("/feed", function(req, res) {
  res.render("feed");
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

router.post("/loggedin", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true
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

  res.redirect("/login");
}


//  upload

router.post("/upload", isLoggedIn, upload.single('file'), function(req, res) {
  if(!req.file) {
    return res.status("400".send("No file were uploaded"));
  }

  res.send("done")


})






















module.exports = router;
