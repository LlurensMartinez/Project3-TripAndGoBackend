const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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
  description: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  favTrips: [{
    type: ObjectId,
    ref: 'Trip',
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;