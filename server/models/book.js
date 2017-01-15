const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./user').userSchema;

// Define our model
const bookSchema = new Schema({
  title: String,
  authors: [{
    type: String
  }],
  imageLink: String,
  owner: userSchema
});


// Create the model class
const ModelClass = mongoose.model('book', bookSchema);

// Export the model
module.exports = ModelClass;
