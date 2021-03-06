const User = require('../models/user').User;

exports.getSettings = (req, res, next) => {

  User.findById(req.user._id)
    .then( user => res.json({ user }) )
    .catch(next);
}

exports.saveSettings = (req, res, next) => {
  
  const password = req.body.password;

  req.user.comparePassword(password, (err, isMatch) => {
    if (err) { return next(err) }
    if (!isMatch) { return  next(new Error("Incorrect Password")) }
    
    const email = req.body.email;
    const city = req.body.city;
    const state = req.body.state;

    User.findOne({ email: email, _id: {$ne: req.user._id}})
      .then( existingUser => {
        if (existingUser) {
          throw new Error('Email is in use');
        }
      })
      .then(() => User.findByIdAndUpdate(req.user._id, { email, city, state}))
      .then(() => User.findById(req.user._id ))
      .then(user => res.json({ user }))
      .catch(next);
    })

}

exports.changePassword = (req, res, next) => {
  
  const password = req.body.password;

  req.user.comparePassword(password, (err, isMatch) => {
    if (err) { return next(err) }
    if (!isMatch) { return next(new Error("Incorrect Password")) }

    const newPassword = req.body.newPassword;
    User.findById(req.user._id)
      .then((user) => {
        user.password = newPassword;
        return user.save();
      })
      .then(user => res.json({ user }))
      .catch(next);
    });
}



