const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    require : true
  },
  password: {
    type: String,
    require : true
  },
  name: {
    type: String,
    require : true
  },
  phoneNumber: {
    type: Number,
    require : true
  },
  imageURL: {
    type: String,
  },
  favTrips: {
    type:[String]
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;