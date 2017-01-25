const jwt = require('jwt-simple');
const User = require('../models/user').User;
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = (req, res, next) => {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {

  const email = req.body.user.email;
  const password = req.body.user.password;

  if (!email || !password) {
    return next(new Error('You must provide email and password'));
  }


  // See if a user with the given email exists
  User.findOne({ email: email })
    .then( existingUser => {

      // If a user with email does exist, return an error
      if (existingUser) {
        throw new Error('Email is in use');
      }
    })
    .then(() => {
      // If a user with email does NOT exist, create and save user record
      return User.create(req.body.user);
    })
    .then((user) => {
      return res.json({ token: tokenForUser(user) });
    })
    .catch(next);
    
}
