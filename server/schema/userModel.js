const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'listing' }],
});

module.exports = mongoose.model('user', userSchema);
