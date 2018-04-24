const LocalStrategy = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const user        = require('../db/users/index');

module.exports = function(passport) {

  passport.use(new LocalStrategy(
    function(username, password, done) {
      // Match Username
      user.find(username)
        .then(({ id, hash, username }) => {
        if (bcrypt.compareSync(password, hash)) {
          done(null, { id, username });
        } else {
          done('Please verify your email and password', false);
        }
        })
        .catch(error => done('Please verify your email and password', false));
    }
  ));

  //Sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    user.findById(id).then(function(user) {
      console.log('deserializing user:', user.dataValues);
      done(null, user);
    }).catch(function(err) {
      if (err) {
        throw err;
      }
    });
  });

};
