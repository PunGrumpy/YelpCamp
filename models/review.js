const mongoose = require('mongoose')
const { Schema, model } = mongoose

const reviewSchema = Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Review', reviewSchema)
