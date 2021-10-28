const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  HomeAdress: {
    type: String,
    required: true
  },
  CountryCode: {
    type: String,
    required: true,
  },
  TelephoneNumbers: {
    type: Object,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  PassportNumber: {
    type: String,
    required: true
  },
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;