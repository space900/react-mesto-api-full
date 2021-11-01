const mongoose = require('mongoose');
const messages = require('../errors/messages');

// const cardValidity = /^(http:\/\/|https:\/\/w*\w)/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(http:\/\/|https:\/\/w*\w)/.test(v);
      },
      message: messages.BAD_URL_VALID,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{ versionKey: false });

module.exports = mongoose.model('card', cardSchema);
