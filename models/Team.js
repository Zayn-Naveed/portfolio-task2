const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'https://picsum.photos/200/200?random=1'
  },
  bio: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    default: '#'
  },
  github: {
    type: String,
    default: '#'
  }
});

module.exports = mongoose.model('Team', teamSchema);