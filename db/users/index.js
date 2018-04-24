const bcrypt = require('bcrypt');
const db = require('../index');

const create = (email, password) =>
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        return err;
      }
      db.one(
        'INSERT INTO users (email, hash) VALUES (${email}, ${hash}) RETURNING id, email',
        {
          email,
          hash
        }
      )        
    });
  }); 

const find = email => db.one('SELECT * FROM users WHERE email=${email}');

const serialize = (user, done) => done(null, user.id);

const deserialize = (id, done) =>
  db
    .one('SELECT * FROM users WHERE id=${id}', { id })
    .then(({ id, email }) => done(null, { id, email }))
    .catch(error => done(error));

module.exports = {
  create,
  find,
  serialize,
  deserialize
};