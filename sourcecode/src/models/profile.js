const mongoose = require('mongoose')
let Schema = mongoose.Schema

const profileSchema = new Schema({
  supplierId: String,
  topics: Array,
  endpoints: Array
}, {
  versionKey: false
})

let profile = mongoose.model('profile', profileSchema, 'profile')

module.exports = profile
