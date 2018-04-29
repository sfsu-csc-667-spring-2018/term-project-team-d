var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('login',
    { title: 'Login - CSC 667',
      user: req.user,
      description: 'Term Project',
      css: ['bootstrap.min.css','font-awesome.min.css','login.css'],
      js: ['jquery.min.js','bootstrap.min.js']
    }
  );
});

module.exports = router;