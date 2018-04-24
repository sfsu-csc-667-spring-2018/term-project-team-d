var express = require('express');
var router = express.Router();

const user = require('../../db/users/index');
const passport = require('../../auth/index');

router.get('/', function (req, res) {
  res.render('register',
    { title: 'Sign Up - CSC 667',
      user: req.user,
      description: 'Term Project',
      css: ['bootstrap.min.css','font-awesome.min.css'],
      js: ['jquery.min.js','bootstrap.min.js']
    }
  );
})

router.post('/', function (req, res) {
  let email = req.body.email;
  let pw = req.body.password;
  console.log(email, pw);
  if(user.create(email,pw)){
    res.render('./login');
  }else{
    res.render('./register');
  }
});
// router.post('/', passport.authenticate('local', {
//   successRedirect : '/users', // redirect to the secure profile section
//   failureRedirect : '/register', // redirect back to the signup page if there is an error
//   //failureFlash : true // allow flash messages
// }));

module.exports = router;