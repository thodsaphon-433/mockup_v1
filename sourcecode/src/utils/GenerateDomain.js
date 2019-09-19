const cfg = require('../config/config').get(process.env.node_env)

/**
 *  [GenerateDomain] =================
 * @param {String} serviceName
 * @param {String} cmdName
 * @param {Object} opt 1.param 2.query
 */
exports.getDomainCfg = (serviceName, cmdName, opt) => {
  // ======================== [START Inti parameter] ========================
  const nodeName = serviceName
  const param = opt ? opt.param : undefined
  const query = opt ? opt.query : undefined
  // get from default
  let domain = cfg.service[nodeName].default
  // ======================== [END Inti parameter] ========================

  // get with cmd
  if (cfg.service[nodeName][cmdName]) {
    domain = cfg.service[nodeName][cmdName]
  }

  // let url = domain.conn_type + '://' + domain.ip + ':' + domain.port + domain.path
  let url = domain.conn_type + '://' + domain.ip + ':' + domain.port + domain.path

  // add queryString
  if (query) {
    url += '?' + convertObj2Query(query)
  }

  // add param
  if (param) {
    url = convertObj2Param(url, param)
  }

  return {
    conn_type: domain.conn_type,
    url: url,
    maxretry: domain.max_retry,
    timeout: domain.timeout,
    retry_condition: domain.retry_condition
  }
}

function convertObj2Query (obj) {
  var str = []
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(p + '=' + obj[p])
    }
  }
  return str.join('&')
}

function convertObj2Param (url, obj) {
  const params = Object.entries(obj)
  for (const param of params) {
    // console.log('param: ', param)
    url = url.replace(':' + param[0], param[1])
  }
  // console.log('url: ', url)
  return url
}

// module.exports.getDomainCfg
