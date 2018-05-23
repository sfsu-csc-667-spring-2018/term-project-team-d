var express = require( 'express' );
var router = express.Router();

const AuthController = require( '../../auth/AuthController' )

router.get( '/', function( request, response ) {
  response.render('register',
    { title: 'Register - CSC 667',
      user: request.user,
      description: 'Term Project',
      css: ['bootstrap.min.css','font-awesome.min.css'],
      js: ['jquery.min.js','bootstrap.min.js']
    }
  );
})

router.post('/', AuthController.create);

module.exports = router;