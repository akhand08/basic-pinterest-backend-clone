var express = require('express');
var router = express.Router();


const userModel = require("./users");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.authenticate(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// register 

router.post("/register", function(req, res) {
  const {username, password, email, fullname} = req.body;
  let newUser = new userModel.create({username, email, fullname});

  userModel.register(newUser, password)
  .then(function() {
    passport.authenticate("local")(req, res, function() {
      res.redirect("/profile");
    })
  })
  
})


// router.post("/register", (req, res) {
//   const {username, password, fullname, email} = req.body;
//   let newUser = new userModel.create({username, fullname, email});

//   userModel.register(newUser, password)
//   .then(function() {
//     passport.authenticate("local")(req, res, function() {
//       res.redirect("profile");
//     })
//   })
// })

// login

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/"
}), function(req, res) {

})



// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/profile",
//   failureRedirect: "/"
// }), functon(req, res) {})






















module.exports = router;
