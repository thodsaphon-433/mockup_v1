'use strict'

/* ------------- [START IMPORT MODULE] ------------ */
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const conflog = require('../config/commonlog-kb.js')
const genUtil = require('../utils/genUtil.js')
const stat = require('../constants/stat.const')
const LogHandle = require('../utils/logHandle.js')
/* ------------- [END IMPORT OUR UTIL] ------------ */

/* ------------- [START IMPLEMENT] ------------ */
module.exports = function () {
  var app = express()

  app.log = LogHandle('::')
  app.rout = require('../../conf/config.json').routing

  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())

  // Filter access allow file
  // FIXME
  // app.all('*.js$|.html|.png|.css', function (req, res, next) {
  //   let referer = req.headers['referer']
  //   if (!referer) {
  //     return res.status(404).send('404 page not found')
  //   }
  //   next()
  // })

  // ประกาศให้ Express ใช้งาน View โดยให้ใช้โฟลเดอร์ views เป็นตัวเก็บไฟล์ jade.
  // app.use(express.static('../../public'))
  // app.use(express.static(path.join(__dirname, '../../templates')))
  // app.set('views', path.join(__dirname, '../../templates'))
  // // set view engine for render
  // app.engine('html', require('consolidate').ejs)
  // app.set('view engine', 'html')

  function getRemoteIp (req, res) {
    var remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || ''
    if (remoteIp.indexOf(':') > -1) {
      var tmp = remoteIp.split(':')
      remoteIp = tmp.length > 0 ? tmp[tmp.length - 1] : remoteIp
    }
    return remoteIp
  }

  /* ------------- [START MIDDLEWARE] ------------ */
  app.use(function (req, res, next) {
    // genarate session
    req.id = req.headers['x-session-id']
    req.xrtid = req.headers['x-rtid']

    // log incoming
    req.logkb = require('../utils/logHandle.js')(`${req.id}:${req.xrtid}:`)
    req.logkb.debug('Start Proccess', req.method, req.originalUrl, '...')

    const remoteIp = getRemoteIp(req, res)
    var headerLog = `FROMIP|${remoteIp}|REQUESTID|${req.id}|URL|${req.method} ${req.originalUrl}|REQHEADER|${JSON.stringify(req.headers)}|REQBODY|${JSON.stringify(req.body)}`
    req.headerLog = headerLog
    return next()
  })
  /* ------------- [END MIDDLEWARE] ------------ */

  const logg = require('commonlog-kb').init(conflog.conf, app)
  logg.sessionID = (req, res) => {
    if (!req.id && !req.xrtid) {
      req.id = genUtil.genXsession() || ''
      req.xrtid = req.query.nonce || genUtil.genTid()
    }
    return req.id + ':' + req.xrtid + ':'
  }

  function logResponseBody (req, res, next) {
    const oldWrite = res.write
    const oldEnd = res.end

    var chunks = []

    res.write = function (chunk) {
      chunks.push(chunk)
      oldWrite.apply(res, arguments)
    }
    res.end = function (chunk) {
      var body = ''

      if (typeof chunk !== 'string' && !(chunk instanceof Buffer)) {
        oldEnd.apply(res, arguments)
        return
      }
      if (!(chunk instanceof String || typeof chunk === 'string')) chunks.push(chunk)
      try {
        // console.dir(chunks)
        body = chunks.length > 0 ? Buffer.concat(chunks).toString('utf8') : ''
      } catch (error) {
        console.error(error)
      }
      res.body = body
      // console.log('res.body: ', res.body)
      // if (res.body.includes('{{HTML_ERROR}}')) {
      //   return res.json({ name: 'sdasd' })
      // }
      if (res.isLog) {
        body = 'HTML FILE'
      }
      let log = `SUMMARY_CLIENT|${req.headerLog}|RESBODY|${body}|`
      req.logkb.debug(log)
      oldEnd.apply(res, arguments)
    }
    next()
  }
  app.use(logResponseBody)

  /* ------------- [START LOAD API ROUTE] ------------ */
  var load = require('express-load')
  var cwdPath = path.join(__dirname, '..')
  load('modules', {
    cwd: cwdPath,
    checkext: true,
    extlist: ['service.js']
  }).into(app)
  load('modules', {
    cwd: cwdPath,
    checkext: true,
    extlist: ['ctrl.js']
  }).into(app)
  load('modules', {
    cwd: cwdPath,
    // verbose: true,
    checkext: true,
    extlist: ['route.js']
  }).into(app)
  app.log.info('load module')
  /* ------------- [END LOAD API ROUTE] ------------ */

  app.all('/error', function (req, res) {
    req.logkb.debug('Got Redirect Error')
    res.status(500).send({
      error: 'Connection close!'
    })
    // Future Action.
  })
  /* ------------- [START NOT MATCH ROUTE - 404 ] ------------ */
  // unknown URL

  app.all('*', function (req, res) {
    var remoteIp = getRemoteIp(req, res)

    const session = `${req.id}:${req.xrtid}:`

    req.logkb = require('../utils/logHandle.js')(session)
    var headerLog = `FROMIP|${remoteIp}|REQUESTID|${req.id}|URL|${req.method} ${req.originalUrl}|REQHEADER|${JSON.stringify(req.headers)}|REQBODY|${JSON.stringify(req.body)}`
    req.headerLog = headerLog
    req.logkb.debug('Start Proccess', req.method, ' Unknown URL...')

    logg.stat(stat.revUknReq)
    logg.stat(stat.retUknErr)

    const ret = {
      resultCode: '50000',
      developerMessage: 'System error',
      error: 'invalid_request'
    }

    const summary = logg.summary(session, '', 'Unknown', '')
    const detail = logg.detail(session, '', 'Unknown', '')

    let rawData = {}
    rawData['url'] = req.originalUrl
    if (req.query.length > 1) { rawData['query'] = req.query }
    if (req.body.length > 1) { rawData['body'] = req.body }

    detail.addInputRequest('CLIENT', 'Unknown', '', JSON.stringify({
      url: rawData['url'],
      query: rawData['query'],
      body: rawData['body']
    }), {
      header: req.headers || '',
      body: (req.body.length > 1) ? req.body : '',
      url: req.originalUrl || '/'
    })

    summary.addErrorBlock('CLIENT', 'Unknown', null, 'Unknown URL=' + req.url + ', Method=' + req.method)
    summary.end(400, 'invalid_request')

    detail.addOutputResponse('CLIENT', 'Unknown', '', JSON.stringify(ret), {
      header: '',
      body: ret,
      url: ''
    })
    detail.end()

    return res.status(400).send(ret)
  })
  /* ------------- [END NOT MATCH ROUTE - 404 ] ------------ */

  return app
}
/* ------------- [END IMPLEMENT] ------------ */
