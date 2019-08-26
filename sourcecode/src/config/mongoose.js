// Bring Mongoose into the app
const mongoose = require('mongoose')
const config = require('./config').get(process.env.node_env).service.mongo.default

let appLog = {}
let mongodbUrl = ''

function db (log) {
  appLog = log
  mongoose.Promise = global.Promise

  mongodbUrl = config.conn_type + '://' + config.url + '/' + config.dbname

  if (config.option) {
    mongodbUrl += '?' + config.option
  }

  // appLog.info('database connecting to: ' + mongodbUrl)

  connectDB()

  require('../models')
}

function connectDB () {
  mongoose.connect(mongodbUrl,
    {
      useNewUrlParser: true,
      user: config.user,
      pass: config.password,
      connectTimeoutMS: 10000,
      reconnectInterval: 500
    }
  )
}

mongoose.connection.on('connecting', function () {
  appLog.info('Mongoose => connect to' + mongodbUrl)
})

mongoose.connection.on('reconnectFailed', function () {
  appLog.info('Mongoose => reconnectFailed...')
})

mongoose.connection.on('connected', function () {
  appLog.info('Mongoose => connect success')
})

mongoose.connection.on('all', function () {
  appLog.info('Mongoose => connect success')
})

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  appLog.info('Mongoose => connection disconnected')
})

// // If the connection throws an error
// var countReconnectDb = 0
mongoose.connection.on('error', function (err) {
  appLog.warn('Mongoose => connection error: ' + err)
  mongoose.connection.close(function () {
    appLog.info('Mongoose auto reconnect every 5000 ms')
    setTimeout(connectDB, 5000)
  })
})

module.exports = db
