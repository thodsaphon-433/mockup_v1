const logg = require('commonlog-kb')
// const messageFunc = require('./decryptClient.func')
const constResultCode = require('../../constants/resultCode.const')
const httpResponse = require('../../utils/httpUtil').httpResponse
const stat = require('../../constants/stat.const')
// const moment = require('moment')
// const appconf = require('../../../conf/config.json').app
// const genUtil = require('../../utils/genUtil')

exports.getPtsAppProfileEntry = function (req, res) {
  /**  ========================== [START VALIABLE] ========================== */
  const appLog = req.logkb
  const body = req.body

  const conf = {
    nodeName: 'mockup',
    cmd: 'getPtsAppProfileEntry',
    requ: 'CLIENT'
  }

  // [INIT SESSION]
  const Xsession = req.id
  const Xrtid = req.xrtid
  /**  ========================== [END VALIABLE] ========================== */

  /**  ========================== [START LOG] ========================== */
  appLog.info('==========> getPtsAppProfileEntry proccessing <==========')
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
  const opt = {
    headers: {
      'X-Session-Id': Xsession,
      'X-Rtid': Xrtid
    }
  }
  appLog.info('setting header: ', opt)
  /**  ========================== [END DETAIL LOG] ========================== */
  try {
    appLog.stat(stat.recvReq(conf.cmd))
    // appLog.debug('receive deliverStatus from url : ===> ', body.callBackUrl)
    appLog.debug('raw headers : ', JSON.stringify(req.rawHeaders))

    const ret = {
      resultDescription: 'Success',
      ptsAppProfileEntry: [
        {
          ptsRule: 'ewoJImNoZWNrTmV0d29yayI6IFsKCQl7CgkJCSJyZWdpc3RlckNoYW5uZWxBdmFpbGFiaWxpdHkiOiAib3RwIiwKCQkJIm5ldHdvcmtBdmFpbGFiaWxpdHkiOiBbCgkJCQkiT1RIRVIiCgkJCV0sCgkJCSJzZXJ2aWNlSWQiOiAicGxheWJveC14eHh4IiwKCQkJImFjY291bnRUeXBlIjogInhYeCIsCgkJCSJvdHBDaGFubmVsIjogInNtc05hamEiCgkJfSwKCQl7CgkJCSJyZWdpc3RlckNoYW5uZWxBdmFpbGFiaWxpdHkiOiAidXNlcnB3ZDNyZCIsCgkJCSJuZXR3b3JrQXZhaWxhYmlsaXR5IjogWwoJCQkJIkFJUyIKCQkJXQoJCX0sCgkJewoJCQkicmVnaXN0ZXJDaGFubmVsQXZhaWxhYmlsaXR5IjogInVzZXJwd2QiLAoJCQkibmV0d29ya0F2YWlsYWJpbGl0eSI6IFsKCQkJCSJBSVMiCgkJCV0KCQl9LAoJCXsKCQkJInJlZ2lzdGVyQ2hhbm5lbEF2YWlsYWJpbGl0eSI6ICJhdXRvIiwKCQkJIm5ldHdvcmtBdmFpbGFiaWxpdHkiOiBbCgkJCQkiQUlTRkJCIgoJCQldCgkJfQoJCSwKCQl7CgkJCSJyZWdpc3RlckNoYW5uZWxBdmFpbGFiaWxpdHkiOiAiZW1haWwiLAoJCQkibmV0d29ya0F2YWlsYWJpbGl0eSI6IFsKCQkJCSJBSVNGQkIiCgkJCV0KCQl9CgkJLAoJCXsKCQkJInJlZ2lzdGVyQ2hhbm5lbEF2YWlsYWJpbGl0eSI6ICJzb2NpYWwiLAoJCQkibmV0d29ya0F2YWlsYWJpbGl0eSI6IFsKCQkJCSJBSVNGQkIiCgkJCV0KCQl9CgldLAoJImF1dG9BY3JGbGFnIjogdHJ1ZSwKCSJjb25zZW50RmxhZyI6IGZhbHNlLAoJImNhY2hpbmdUaW1lIjogMTAsCgkiZmxvd1R5cGUiOiAibm9ybWFsIiwKCSJzYWx0IjogInh4eHh4IiwKCSJhdXRvT2J0YWluRmxhZyI6IHRydWUsCgkidGVtcGxhdGVOYW1lIjogImxvZ2luMiIsCgkiY2FsbEJhY2tVcmwiOiAiaHR0cDovL2dvb2dsZS5jb20iLAoJImNhbGxCYWNrTWV0aG9kIjogWwoJCSJQT1NUIgoJXSwKCSJyZWRpcmVjdFVSTCI6ICJodHRwOi8vMTAuMS4xMjAuMTozMC9rYmMuaW4udGgiLAogICAgInJlZGlyZWN0X3VyaSI6ICJodHRwczovL2Fpcy1zdGctYXBwLmRlbW8tdmlkbnQuY29tL3BvcnRhbC9hdXRoIiwKICAgICJjYXRlZ29yeU5vdEFsbG93IjpbImJ1c2luZXNzIiwiY29ycGVyYXRlIl0sCgkibG9naW5CMkIyQ0F0dGFjaEZsYWciIDpmYWxzZQp9IA=='
        }
      ]
    }
    // {
    //   resultDescription: 'Success',
		// 	"template_name": "vimmi_login",
		// 	"redirectURL": "http://akdev.vidnt.com",
		// 	"networkAvailability": ["AISWIFI", "OTHER", "AISFBB"],
		// 	"registerChannelAvailability": ["otp"],
		// 	"otpChannel": "sms",
		// 	"accountType": "all",
		// 	"serviceId": "AISPlay",
		// 	"clientNetworkAvailability": "OTHER",
		// 	"checkNetworkNoneValidate": [{
		// 		"networkAvailability": ["AIS"],
		// 		"registerChannelAvailability": "auto"
		// 	}, {
		// 		"otpChannel": "sms",
		// 		"accountType": "all",
		// 		"serviceId": "AISPlay",
		// 		"networkAvailability": ["AISWIFI", "OTHER", "AISFBB"],
		// 		"registerChannelAvailability": "otp"
		// 	}],
		// 	"callBackMethod": ["POST"],
		// 	"loginB2B2CAttachFlag": true,
		// 	"flowType": "normal",
		// 	"callBackUrl": "http://appadm.ais-vidnt.com/oss/global_actions/ais_user_notification/",
		// 	"autoObtainFlag": false,
		// 	"consentFlag": false,
		// 	"developerMessage": "Success",
		// 	"resultCode": "20000",
		// 	"partnerId": "30052",
		// 	"appVersion": "1.2.0",
		// 	"platformName": "Android",
		// 	"appName": "vimmiottapp"
		// }
    res.req = req
    appLog.stat(stat.retResSuc(conf.cmd))
    res.header('X-Session-Id', req.headers['x-session-id'])
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
