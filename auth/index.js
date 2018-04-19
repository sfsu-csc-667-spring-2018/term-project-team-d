const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../db/users/index');

const strategy = new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
});

const lookup = (email, password, done) => {
  User.find(email)
    .then(({ id, hash, email }) => {
      if (bcrypt.compareSync(password, hash)) {
        done(null, { id, email });
      } else {
        done('Please verify your email and password', false);
      }
    })
    .catch(error => done('Please verify your email and password', false));
};

passport.use(strategy, lookup);

module.exports = passport;