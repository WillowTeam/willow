const passport = require('passport');
const knex = require('../database/index.js');

module.exports = function() {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    knex('users')
      .where('google_id', user.google_id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err, null);
      });
  });
};