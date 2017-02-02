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
  owner: userSchema,
  asRequestFor: [{
  	type: Schema.Types.ObjectId,
  	ref: 'book'
  }],
  inExchangeFor: [{
  	type: Schema.Types.ObjectId,
  	ref: 'book'
  }]
});


// Create the model class
const ModelClass = mongoose.model('book', bookSchema);

// Export the model
module.exports = ModelClass;
