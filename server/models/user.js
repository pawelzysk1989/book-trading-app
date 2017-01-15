const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
  city: String,
  state: String
});

function encryptPassword(password, callback){
  // generate a salt then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return callback(err); }

    // hash (encrypt) our password using the salt
    bcrypt.hash(password, salt, null, (err, hash) => {
      if (err) { return callback(err); }

      callback(null, hash);
    });
  });
}

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // get access to the user model
  const user = this;
  const password = user.password;

  encryptPassword(password, (err, hash) => {
    if (err) { return next(err); }
    user.password = hash;
    next();
  });

});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}


// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = {
  User: ModelClass,
  userSchema: userSchema
}


