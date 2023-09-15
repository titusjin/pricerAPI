'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoModel = new Schema({
  id: {type: String, required: true, index: { unique: true }},
  title: { type: String, required: false },
  content: { type: String, required: true},
});

module.exports = mongoose.model('Todo', todoModel, 'todos');