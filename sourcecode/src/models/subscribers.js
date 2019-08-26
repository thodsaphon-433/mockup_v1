const mongoose = require('mongoose')
let Schema = mongoose.Schema


const subscribersSchema = new Schema({
  topic: String,
  endpoint: String
}, {
  versionKey: false
})

let subscribers = mongoose.model('subscribers', subscribersSchema, 'subscribers')

module.exports = subscribers
