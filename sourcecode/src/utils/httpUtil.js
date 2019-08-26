'use strict'
const extend = require('extend')
// const genUtil = require('./genUtil')

/**
 * @param {*} res
 * @param {*} resultCode
 * @param {*} nodename
 * @param {*} cmd
 * @param {*} dataRes
 * @param {*} summary
 * @param {*} detail
 */
exports.httpResponse = (res, resultCode, nodename, cmd, dataRes, summary, detail) => {
  const ret = {}
  // ret.resultCode = resultCode.resultCode
  // ret.developerMessage = resultCode.developerMessage
  extend(ret, dataRes)

  summary.end(resultCode.resultCode, resultCode.developerMessage)
  detail.addOutputResponse(nodename, cmd, res.req.xtid, JSON.stringify(ret), {
    header: {
      'X-Session-Id': res.req.xsession || undefined,
      'X-Rtid': res.req.xrtid || undefined,
      'X-Tid': res.req.xtid || undefined
    },
    body: ret,
    url: ''
  })
  detail.end()
  // res.header('X-Session-Id', 'MU' + genUtil.genXsession())
  return res.status(resultCode.httpStatus).json(ret)
}

exports.httpResponseXml = (res, resultCode, nodename, cmd, dataRes, summary, detail) => {
  const ret = {}
  ret.resultCode = resultCode.resultCode
  ret.developerMessage = resultCode.developerMessage
  extend(ret, dataRes)

  summary.end(resultCode.resultCode, resultCode.developerMessage)
  detail.addOutputResponse(nodename, cmd, res.req.xtid, JSON.stringify(ret), {
    header: {
      'X-Session-Id': res.req.xsession || undefined,
      'X-Rtid': res.req.xrtid || undefined,
      'X-Tid': res.req.xtid || undefined
    },
    body: ret,
    url: ''
  })
  detail.end()
  // res.header('X-Session-Id', 'MU' + genUtil.genXsession())
  return res.status(resultCode.httpStatus).send(dataRes)
}
