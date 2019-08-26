'use strict'

const fs = require('fs')
const http = require('http')
const https = require('https')
const path = require('path')
/* ------------- [START STORE CONFIG] ------------ */
process.env.node_env = 'development'
const config = require('./src/config/config').get(process.env.node_env)
/* ------------- [END STORE CONFIG] ------------ */

/* ------------- [START IMPORT OUR MODULE] ------------ */
const express = require('./src/config/express')
var app = express()
/* ------------- [END IMPORT OUR MODULE] ------------ */

/* ------------- [START DATABASE CONNECTION.] ------------ */
// require('./src/config/mongoose')(app.log)
/* ------------- [END DATABASE CONNECTION.] ------------ */

/* ------------- [START CONSUMER KAFKA CONNECTION.] ------------ */
// require('./src/services/kafka-service-consumer')
/* ------------- [END CONSUMER KAFKA CONNECTION.] ------------ */

/* ------------- [START INITIAL OUR APPLICATION] ------------ */
if (config.use_https === true) {
  /* ------------- [START IMPORT SSL CONFIG] ------------ */
  const privateKey = fs.readFileSync(path.join(__dirname, '/', config.key))
  const certificate = fs.readFileSync(path.join(__dirname, '/', config.cert))
  /* ------------- [END IMPORT SSL CONFIG] ------------ */

  const options = {
    key: privateKey,
    cert: certificate
  }
  options.rejectUnauthorized = false
  https.createServer(options, app).listen(config.app_port)
  app.log.info(`Is Secure : | Port : ${config.app_port}`)
} else {
  http.createServer(app).listen(config.app_port)
  app.log.info(`Isn't Secure : | Port : ${config.app_port}`)
}
app.log.info('ENVIRONMENT : ' + process.env.node_env)

/* ------------- [END INITIAL OUR APPLICATION] ------------ */
