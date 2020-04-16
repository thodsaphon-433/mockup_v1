const logg = require('commonlog-kb')
// const messageFunc = require('./decryptClient.func')
const constResultCode = require('../../../constants/resultCode.const')
const httpResponse = require('../../../utils/httpUtil').httpResponse
const stat = require('../../../constants/stat.const')
// const moment = require('moment')
// const appconf = require('../../../conf/config.json').app
const genUtil = require('../../../utils/genUtil')

exports.sendOneTimePassword = function (req, res) {
  /**  ========================== [START VALIABLE] ========================== */
  const appLog = req.logkb
  const body = req.body

  const conf = {
    nodeName: 'mockup',
    cmd: 'sendOneTimePassword',
    requ: 'CLIENT'
  }

  // [INIT SESSION]
  const Xsession = req.id
  const Xrtid = req.xrtid
  /**  ========================== [END VALIABLE] ========================== */

  /**  ========================== [START LOG] ========================== */
  appLog.info('==========> sendOneTimePassword proccessing <==========')
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
      code: '2000',
      description: 'SUCCESS',
      isSuccess: 'true',
      orderRef: '0720160428073728988',
      transactionID: 'MdAiNf4OmyOJWLa63M',
      referenceNumber: '2954',
      operName: 'AIS',
      lifeTimeoutMins: '10',
      expirePassword: '28/04/2016 07:47:28',
    };

    res.req = req
    appLog.stat(stat.retResSuc(conf.cmd))
    res.set(
      {
        'X-Session-Id': req.headers['x-session-id']
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
