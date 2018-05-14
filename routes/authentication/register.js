var express = require('express');
var router = express.Router();

const user = require('../../db/users/index');
const AuthController = require('../../auth/AuthController')

router.get('/', function (req, res) {
  res.render('register',
    { title: 'Register - CSC 667',
      user: req.user,
      description: 'Term Project',
      css: ['bootstrap.min.css','font-awesome.min.css'],
      js: ['jquery.min.js','bootstrap.min.js']
    }
  );
})

router.post('/', AuthController.create);

module.exports = router;