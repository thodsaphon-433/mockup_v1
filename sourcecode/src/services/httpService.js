process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const rp = require('request-promise').defaults({ resolveWithFullResponse: true, simple: false })
const headerConst = require('../constants/headers.const')
const extend = require('extend')
const moment = require('moment')
const OPTIONS = { headers: headerConst.headers, json: true }

module.exports = request

/**
 * [request]
 * @param {*} url
 * @param {*} opt
 * @param {*} appLog
 */
async function request (opt, appLog, detail, summary, retryTime) {
  const genUtil = require('../utils/genUtil')
  const stat = require('../constants/stat.const')

  let options = { headers: {} }

  extend(options, opt)
  extend(options.headers, OPTIONS.headers, opt.headers)

  // Check options.
  appLog.debug('[httpServices.request] options extend: ', options)

  // setting options.
  options.timeout = opt.conf.timeout <= 0 ? 10000 : opt.conf.timeout * 1000
  options.method = opt.method || 'GET'
  options.uri = options.conf.url
  options.headers['X-Tid'] = genUtil.genTid()
  if (options.conf.commandId) { options.body['commandId'] = options.headers['X-Tid'] }

  // debug request log.
  const trancLog = 'CALL_SERVICE|' + options.conf.desNode +
                   ' __METHOD=' + options.method +
                   ' __COMMAND=' + options.conf.cmd +
                   ' __URI=' + options.conf.url +
                   ' __REQHEADERS=' + JSON.stringify(options.headers) +
                   ' __REQBODY=' + (Object.keys(options.body).length === 0 ? '' : JSON.stringify(options.body))
  //  (opt.method === 'POST' ? (' __REQBODY=' + JSON.stringify(options.body)) : ('__REQQUERY=' + JSON.stringify(options.query)))

  // if (options.method === 'POST') {
  if (retryTime > 0) {
    detail.addOutputRequestRetry(options.conf.desNode, options.conf.cmd, options.headers['X-Tid'], (Object.keys(options.body).length === 0 ? null : JSON.stringify(options.body)), {
      Header: options.headers,
      Body: (options.method === 'POST' ? (Object.keys(options.body).length === 0 ? null : options.body) : undefined),
      QueryString: (Object.keys(options.query).length === 0 ? null : options.query),
      Url: options.conf.url
    }, retryTime, options.conf.maxretry)
  } else {
    detail.addOutputRequest(options.conf.desNode, options.conf.cmd, options.headers['X-Tid'], (Object.keys(options.body).length === 0 ? null : JSON.stringify(options.body)), {
      Header: options.headers,
      Body: (options.method === 'POST' ? (Object.keys(options.body).length === 0 ? null : options.body) : undefined),
      QueryString: (Object.keys(options.query).length === 0 ? null : options.query),
      Url: options.conf.url
    }, options.conf.conn_type, options.method)
  }
  detail.end()

  appLog.stat(stat.sentReq((options.conf.social ? 'social_authentication' : options.conf.desNode), options.conf.cmd))
  // REQUESTER.
  const reqTime = moment().valueOf()
  const resultTransection = await rp(options, function (err, response, body) {
    const resTime = moment().valueOf()
    // debug response log.
    const responseLog = ' __RESPSTATUS=' + (response ? response.statusCode : '') +
                        ' __RESPHEADER=' + (response ? JSON.stringify(response.headers) : '') +
                        ' __RESPBODY=' + (body ? JSON.stringify(body) : '') +
                        ' __RESPTIME=' + (resTime - reqTime) +
                        ' __ERRORMESSAGE=' + ((response && !(/^2/.test('' + response.statusCode))) ? JSON.stringify(response) : '') +
                        ' __EXCEPTION=' + (JSON.stringify(err) || '')

    appLog.info(trancLog + responseLog)

    return response
  }).catch(function (error) {
    if (error.error.code === 'ESOCKETTIMEDOUT') {
      const resTime = moment().valueOf()
      appLog.warn('[httpSercices.request] httpService Recv error: ', error.error.code)

      const responseLog = ' |__RESPSTATUS= __RESPHEADER= __RESPBODY= __RESPTIME=' + (resTime - reqTime) +
      ' __ERRORMESSAGE=' + `timeout of ${(options.conf.timeout * 1000)}ms ` +
      '__EXCEPTION=timeout'

      appLog.warn(trancLog + responseLog)

      // [STAT]
      appLog.stat(stat.recvResTimeout((options.conf.social ? 'social_authentication' : options.conf.desNode), options.conf.cmd))
      // [DEATIL]
      detail.addInputResponseTimeout(options.conf.desNode, options.conf.cmd, options.headers['X-Tid'])
      // [SUMMARY]
      summary.addErrorBlock(options.conf.desNode, options.conf.cmd, null, 'timeout')

      // Condition retry
      if (options.conf.retry_condition.includes('TIMEOUT')) { // [re-try in TIMEOUT case]
        appLog.info('DOING RE-TRY IN TIMEOUT: ' + options.conf.retry_condition)
        appLog.warn('RECV TIMEOUT FROM: ', options.conf.desNode)
        appLog.warn('RECV TIMEOUT CMD: ', options.conf.cmd)

        // Retry condtion.
        if (retryTime < opt.conf.maxretry) {
          retryTime += 1
          appLog.info('RE-TRY ROUND: ' + retryTime + '/' + opt.conf.maxretry)

          return request(opt, appLog, detail, summary, retryTime)
        }
      }

      const err = new Error()
      err.code = 'connection_error'
      err.error = 'esocket_timed_out'
      err.desNode = options.conf.desNode
      err.cmd = options.conf.cmd

      throw err
    } else if (error.error.code === 'ECONNREFUSED' || error.error.code === 'ETIMEDOUT' || error.error.code === 'ECONNRESET') {
      appLog.warn('[httpSercices.request] httpService Recv error: ', error.error.code)

      appLog.stat(stat.recvResConErr((options.conf.social ? 'social_authentication' : options.conf.desNode), options.conf.cmd))
      detail.addInputResponseError(options.conf.desNode, options.conf.cmd, opt.headers['X-Tid'])
      summary.addErrorBlock(options.conf.desNode, options.conf.cmd, null, 'connection_error')

      if (options.conf.retry_condition.includes('CONNECTION_ERROR')) { // [re-try in CONNECTION_ERROR case]
        appLog.info('DOING RE-TRY IN CONNECTION_ERROR: ' + options.conf.retry_condition)
        appLog.warn('RECV CONNECTION_ERROR FROM: ', options.conf.desNode.toUpperCase())
        appLog.warn('RECV CONNECTION_ERROR CMD: ', options.conf.cmd)

        // Retry condtion.
        if (retryTime < opt.conf.maxretry) {
          retryTime += 1
          appLog.info('RE-TRY ROUND: ' + retryTime + '/' + opt.conf.maxretry)

          return request(opt, appLog, detail, summary, retryTime)
        }
      }

      const err = new Error()
      err.code = 'connection_error'
      err.error = 'econnreseted'
      err.desNode = options.conf.desNode
      err.cmd = options.conf.cmd

      throw err
    } else { // [Other error case]
      appLog.warn('[httpSercices.request] catch: ', error)

      const err = new Error()
      err.code = 'unhandle_error'
      err.error = error
      err.desNode = options.conf.desNode
      err.cmd = options.conf.cmd

      throw err
    }
  })

  /**
   * [MAPPING_RESPONSE]
   */
  const ret = {
    headers: resultTransection.headers,
    body: resultTransection.body
  }

  detail.addInputResponse(options.conf.desNode, options.conf.cmd, ret.headers['x-tid'] || options.headers['X-Tid'], JSON.stringify(ret.body) || null, {
    Header: ret.headers,
    Body: ret.body || null
  })

  // Check X-Tid.
  if ((ret.headers['x-tid'] || ret.headers['x-tid'] === '') && (ret.headers['x-tid'] !== options.headers['X-Tid'])) {
    appLog.debug('vadidate X-Tid Token false')

    appLog.stat(stat.recvBadRes((options.conf.social ? 'social_authentication' : options.conf.desNode), options.conf.cmd))

    summary.addErrorBlock(options.conf.desNode, options.conf.cmd, null, 'invalid=X-Tid')

    const err = new Error()
    err.code = 'invalid'
    err.error = 'X-Tid'
    err.desNode = options.conf.desNode
    err.cmd = options.conf.cmd

    throw err
  } else if (ret.headers['content-type'].includes('application/json') && typeof ret.body !== 'object') {
    appLog.warn('[httpSercices.request] catch: invalid content-type')
    appLog.stat(stat.recvBadRes((options.conf.social ? 'social_authentication' : options.conf.desNode), options.conf.cmd))
    summary.addErrorBlock(options.conf.desNode, options.conf.cmd, null, 'Invalid=Content-Type')

    const err = new Error()
    err.code = 'invalid'
    err.error = 'Content-Type'
    err.desNode = options.conf.desNode
    err.cmd = options.conf.cmd

    throw err
  }

  return ret
}

/**
 * GET REQUEST
 * @param {Object} query
 * @param {Object} opt
 * @param {Object} appLog
 * @param {Object} detail
 * @param {Object} summary
 */
request.get = function (query, opt, appLog, detail, summary) {
  var options = {}
  opt = opt || {}
  extend(options, OPTIONS, opt)
  options.method = 'GET'
  // options.headers['Content-Length'] = 0
  delete options.headers['Content-Length']
  options.body = {}
  options.query = query
  return request(options, appLog, detail, summary, 0)
}

/**
 * POST REQUEST
 * @param {Object} data
 * @param {Object} queryString
 * @param {Object} opt
 * @param {Object} appLog
 * @param {Object} detail
 * @param {Object} summary
 */
request.post = function (data, queryString, opt, appLog, detail, summary) {
  var options = {}
  extend(options, OPTIONS, opt)
  options.method = 'POST'
  options.query = queryString

  // Check line condition (cuz line need urlencoded).
  if (options.headers['content-type'] === 'application/x-www-form-urlencoded') {
    appLog.debug('form data')
    options.form = data
    options.json = false
  } else {
    appLog.debug('json data')
    options.body = data
    options.json = true
  }

  if (!data) {
    delete options.headers['Content-Length']
  }

  return request(options, appLog, detail, summary, 0)
}
