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

router.post('/create', function(req, res, next){
  var psql = 'INSERT INTO games (black, white, turn) VALUES(0, 1, 1)';
})


module.exports = router;