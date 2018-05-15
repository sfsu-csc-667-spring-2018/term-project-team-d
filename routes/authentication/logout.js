var express = require('express');
var router = express.Router();
const AuthController = require('../../auth/AuthController');

router.get('/', AuthController.logout);

module.exports = router;