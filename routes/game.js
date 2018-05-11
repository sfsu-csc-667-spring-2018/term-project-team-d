var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('game',
    { title: 'game - CSC 667',
      description: 'Term Project',
      css: ['game.css'],
    }
  );
});


module.exports = router;