const logg = require('commonlog-kb')
// const messageFunc = require('./decryptClient.func')
const constResultCode = require('../../constants/resultCode.const')
const httpResponse = require('../../utils/httpUtil').httpResponse
const stat = require('../../constants/stat.const')
// const moment = require('moment')
// const appconf = require('../../../conf/config.json').app
const genUtil = require('../../utils/genUtil')

exports.postRSAKey = function (req, res) {
  /**  ========================== [START VALIABLE] ========================== */
  const appLog = req.logkb
  const body = req.body

  const conf = {
    nodeName: 'mockup',
    cmd: 'postRSAKey',
    requ: 'CLIENT'
  }

  // [INIT SESSION]
  const Xsession = req.id
  const Xrtid = req.xrtid
  /**  ========================== [END VALIABLE] ========================== */

  /**  ========================== [START LOG] ========================== */
  appLog.info('==========> postRSAKey proccessing <==========')
  // const identity = `${Xsession}:${Xrtid}:${Xtid}`
  const session = `${Xsession}:${Xrtid}:`
  const summary = logg.summary(session, '', conf.cmd, '')
  const detail = logg.detail(session, '', conf.cmd, '')
  /**  ========================== [END LOG] ========================== */

  // [INSERT DETAIL REQ.CLIENT]
  detail.addInputRequest(conf.requ, conf.cmd, '', JSON.stringify(body), {
    header: req.headers,
    body: '',
    url: req.originalUrl
  })

  /**  ========================== [START DETAIL LOG] ========================== */
  // const opt = {
  //   headers: {
  //     'X-Session-Id': Xsession,
  //     'X-Rtid': Xrtid
  //   }
  // }
  // appLog.info('setting header: ', opt)
  /**  ========================== [END DETAIL LOG] ========================== */
  try {
    appLog.stat(stat.recvReq(conf.cmd))
    // appLog.debug('receive deliverStatus from url : ===> ', body.callBackUrl)
    appLog.debug('raw headers : ', JSON.stringify(req.rawHeaders))

    const ret = {
      "resultCode": "20000",
      "developerMessage": "Success",
      "kid": "q5PuD8553s",
      "privatekey": "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJv+N8K8ec0osjgIBg88HhF2PIk18H0ZHOgHGOPp27/A8UhNz8B079J+rnWeAp3Lg5WGfKf/V6eMhAY0EDkYp5dqo0/bBgf1xElUmw1iWms0P3k9cpg3cY6rgo9PAqZlwh6lELbkRmrOX5tyXMm7GJ6bwMxDQPymer5dOyDei2qdAgMBAAECgYA8wMGOwkDduh/O2rEhddRwEJB7D9rdnc44P6td+FJxV/+gnU1wMxrD7Dqd7DAwrHZO4dXix/uncX5pvBUlZ4i9P8zfvS36du9yZA9tPYQ+nwAh9BuzRkVcRwUxisb0N3iDaBCPHaMXar3YRd5lwj9PLRdWdlIEQdEjKxq/6V+oAQJBANidCuGsSZTrxIKU1xN1MYrOGvq8yTIw1VB1azfSjy/1WLaZKKZknsZ9r1iPrawwGfRTswivvt7VpwnHYKK7oR0CQQC4W2gjTERoNWGZzJaLYU/vgNg4YgvSQUzeqtfx30LBU6o0EvH0rsFCrzi7LG+zObR40pq3dAyD6OwyDccsSjeBAkEAoleIWTwDZZ4RiAA+9PFHMQ1pAPROIdSheoyVz595+up5E1jUM2iD6qU1rjz4X20pdojoTCFS/rTHXLfVgAD5LQJAT1xp8+f8+q8gGMkNdWqqsntQmNT8KcKaiLAazbBCWF7fwhL1vVMNNtufHFQAsbKBkhF3MMnwKUi3hMSRnOtGAQJACh2Xdr7rJQcOck+slf5O2zCfbO8s7ym1FiJFU4TUVhciwyxROztZFjpNNJN3phEwR2CIPE6ICzpn/y64dA9jag==",
      "expires_in": 86400
    }
    res.req = req
    appLog.stat(stat.retResSuc(conf.cmd))
    res.set(
      {
        'X-Session-Id': req.headers['x-session-id'],
        'X-Tid': req.headers['x-tid'],
        'X-Rtid': req.headers['x-rtid']
      }
    )
    return httpResponse(res, constResultCode[20000], conf.node, conf.cmd, ret, summary, detail)
  } catch (error) {
    if (typeof error.code === 'string') {
      appLog.warn('[messageCtrl.messages] Catch: HANDLE ERROR')
      if (error.code === 'connection_error') {
        appLog.warn('[messageCtrl.messages] Catch: ', error.code)
        return httpResponse(res, constResultCode[50000], conf.node, conf.cmd, null, summary, detail)
      } else {
        appLog.warn('[messageCtrl.messages] Catch: ', error.code)
        appLog.stat(stat.retResSysErr(conf.cmd))
        return httpResponse(res, constResultCode[50000], conf.node, conf.cmd, null, summary, detail)
      }
    } else {
      appLog.warn('[messageCtrl.messages] UNHANDLE ERROR')
      appLog.warn('[messageCtrl.messages] Catch: ', error)
      appLog.stat(stat.retResSysErr(conf.cmd))
      return httpResponse(res, constResultCode[50000], conf.node, conf.cmd, null, summary, detail)
    }
  }
}
