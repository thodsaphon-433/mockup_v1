const logg = require('commonlog-kb')
// const messageFunc = require('./decryptClient.func')
const constResultCode = require('../../../constants/resultCode.const')
const httpResponse = require('../../../utils/httpUtil').httpResponse
const stat = require('../../../constants/stat.const')
// const moment = require('moment')
// const appconf = require('../../../conf/config.json').app
// const genUtil = require('../../utils/genUtil')

exports.getPtsServiceProfileEntry = function (req, res) {
  /**  ========================== [START VALIABLE] ========================== */
  const appLog = req.logkb
  const body = req.body

  const conf = {
    nodeName: 'mockup',
    cmd: 'getPtsServiceProfileEntry',
    requ: 'CLIENT'
  }

  // [INIT SESSION]
  const Xsession = req.id
  const Xrtid = req.xrtid
  /**  ========================== [END VALIABLE] ========================== */

  /**  ========================== [START LOG] ========================== */
  appLog.info('==========> getPtsServiceProfileEntry proccessing <==========')
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
      resultCode: "20000",
      resultDescription: "Success",
      ptsServiceProfileEntry: [
        {
          dn:
            "ptsAppKeyName=TestSingularity|Browser|1.0.0,ds=Service,ds=pts,subdata=services,uid=661550888279074,ds=SUBSCRIBER,o=AIS,dc=C-NTDB",
          objectClass: "ptsServiceProfileEntry",
          ptsListOfAPI: [
            "sgl/workspace:1111",
            "sgl/profiles:1111",
            "sgl/masters:1111",
            "marketplace/products:1111",
            "marketplace/banners:1111",
            "marketplace/carts:1111",
            "marketplace/orders:1111",
            "marketplace/ships:1111",
            "marketplace/payments:1111"
          ],
          ptsAppId: "93012200005",
          ptsAppState: "active",
          ptsListOfRedirectURL: [
            "partner_iot|https://10.104.240.216:8443/hummus",
            "production|https://sfe.ais.co.th:8443/hummus",
            "https://www.ais.co.th/",
            "https://localhost:9090/api/oauth/callback",
            'http://localhost:8989/api/oauth/callback',
            'http://25.31.155.31:8989/api/oauth/callback',
            'https://www.ais.co.th/&scope=profile&state=poc0000001&nonce=poc-iot-2xxxxxxx'
          ],
          ptsMaxAuthCodeTime: "3600000",
          ptsListOfVMIP: [
            "partner_iot|13.228.4.50",
            "production|13.229.186.78"
          ],
          ptsMaxAccessTokenTime: "3600000"
        }
      ]
    };
    // const ret = {
    //   resultCode: '20000',
    //   resultDescription: 'Success',
    //   ptsAppProfileEntry: [
    //     {
    //       dn: 'ptsAppName=vimmiottapp,ds=Service,ds=pts,subdata=services,uid=661451235871303,ds=SUBSCRIBER,o=AIS,DC=C-NTDB',
    //       ptsAppName: 'vimmiottapp',
    //       ptsRule: 'eyJjaGVja05ldHdvcmsiOlt7InJlZ2lzdGVyQ2hhbm5lbEF2YWlsYWJpbGl0eSI6ImF1dG8iLCJuZXR3b3JrQXZhaWxhYmlsaXR5IjpbIkFJUyJdfSx7InJlZ2lzdGVyQ2hhbm5lbEF2YWlsYWJpbGl0eSI6Im90cCIsIm5ldHdvcmtBdmFpbGFiaWxpdHkiOlsiQUlTV0lGSSIsIk9USEVSIiwiQUlTRkJCIl0sInNlcnZpY2VJZCI6IkFJU1BsYXkiLCJhY2NvdW50VHlwZSI6ImFsbCIsIm90cENoYW5uZWwiOiJzbXMifV0sImNvbnNlbnRGbGFnIjpmYWxzZSwiYXV0b09idGFpbkZsYWciOmZhbHNlLCJjYWNoaW5nVGltZSI6IjMwIiwiY2FsbEJhY2tVcmwiOiJodHRwczovL2Fpcy1zdGctYXBwYWRtLmRlbW8tdmlkbnQuY29tL29zcy9nbG9iYWxfYWN0aW9ucy9haXNfdXNlcl9ub3RpZmljYXRpb24vIiwiZmxvd1R5cGUiOiJub3JtYWwiLCJsb2dpbkIyQjJDQXR0YWNoRmxhZyI6dHJ1ZSwidGVtcGxhdGVOYW1lIjoidmltbWlfbG9naW4iLCJjYWxsQmFja01ldGhvZCI6WyJQT1NUIl19',
    //       objectClass: 'ptsAppProfileEntry'
    //     }
    //   ]
    // }
    // {
    //   "resultCode": "20000",
    //   "resultDescription": "Success",
    //   "ptsAppProfileEntry": [
    //     {
    //       "dn":"ptsAppName=TestSingularity,ds=Service,ds=pts,subdata=services,uid=661550888279074,ds=SUBSCRIBER,o=AIS,dc=C-NTDB",
    //       "ptsAppName":"TestSingularity",
    //       "objectClass":"ptsAppProfileEntry",
    //     /*
    //       * IOT P'Nui
    //       */
    //       ptsRule: 'ewoJImNoZWNrTmV0d29yayI6IFt7CgkJInJlZ2lzdGVyQ2hhbm5lbEF2YWlsYWJpbGl0eSI6ICJhdXRvIiwKCQkibmV0d29ya0F2YWlsYWJpbGl0eSI6IFsiQUlTIl0KCX0sIHsKCQkicmVnaXN0ZXJDaGFubmVsQXZhaWxhYmlsaXR5IjogIm90cCIsCgkJIm5ldHdvcmtBdmFpbGFiaWxpdHkiOiBbIkFJU1dJRkkiLCAiT1RIRVIiLCAiQUlTRkJCIl0sCgkJInNlcnZpY2VJZCI6ICJBSVNQbGF5IiwKCQkiYWNjb3VudFR5cGUiOiAiYWxsIiwKCQkib3RwQ2hhbm5lbCI6ICJzbXMiCgl9XSwKCSJjb25zZW50RmxhZyI6IGZhbHNlLAoJImF1dG9PYnRhaW5GbGFnIjogZmFsc2UsCgkiY2FjaGluZ1RpbWUiOiAiMzAiLAoJImNhbGxCYWNrVXJsIjogImh0dHBzOi8vYWlzLXN0Zy1hcHBhZG0uZGVtby12aWRudC5jb20vb3NzL2dsb2JhbF9hY3Rpb25zL2Fpc191c2VyX25vdGlmaWNhdGlvbi8iLAoJImZsb3dUeXBlIjogIm5vcm1hbCIsCgkibG9naW5CMkIyQ0F0dGFjaEZsYWciOiB0cnVlLAoJInRlbXBsYXRlTmFtZSI6ICJ2aW1taV9sb2dpbiIsCgkiY2FsbEJhY2tNZXRob2QiOiBbIlBPU1QiXQp9'
    //       /*
    //      * P'Flim
    //      */
    //       "ptsRule":"eyJwb2xpY3kiOnsidGVtcGxhdGVfZm9ybSI6InNpbmd1bGFyaXR5Iiwic3NvIjp0cnVlLCJjaGFubmVscyI6W3siZW1haWxfcGFzc3dvcmQiOnsiaGFuZGxlX3JlZGlyZWN0X2J5X3RlbXBsYXRlIjp0cnVlLCJhY3RpdmF0aW9uX2xpbmtfaG9zdCI6Imh0dHBzOi8vaW90LWF1dGh2My5haXMuY28udGgvYXV0aC8iLCJ0ZW1wbGF0ZV9pZF90b2tlbl9pbmZvIjp7ImZpcnN0bmFtZSI6InN1YnNjcmliZXJQcm9maWxlLmdpdmVuTmFtZSIsImxhc3RuYW1lIjoic3Vic2NyaWJlclByb2ZpbGUuc3VybmFtZSIsInVzZXJuYW1lIjoic3Vic2NyaWJlclByb2ZpbGUucGZVc2VybmFtZSJ9fX0seyJzb2NpYWxfZ29vZ2xlIjp7ImNsaWVudF9pZCI6Ijg4NzA1MDE4NTAxOS0wNTluNWlmMG8zMXVxOGpobm5iYXRwOTE2azc2NmVwci5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImNsaWVudF9zZWNyZXQiOiJIVEZVOXFmVXdwYUFFMmhCX0VIYjJGVDIiLCJzZWxlY3RpdmVfcHVibGljX2lkIjoiZW1haWx8ZW1haWwsZ29vZ2xlX2lkfHN1YiIsInNjb3BlX3Blcm1pc3Npb24iOiJwcm9maWxlIG9wZW5pZCBlbWFpbCIsInRlbXBsYXRlX2lkX3Rva2VuX2luZm8iOnsiaWQiOiJzdWIiLCJlbWFpbCI6ImVtYWlsIiwibmFtZSI6Im5hbWUiLCJwaWN0dXJlIjoicGljdHVyZSJ9fX0seyJzb2NpYWxfZmIiOnsiYXBwX2lkIjoiMTEwNTEwNDg4NjMxNjc2NiIsImFwcF9hY2NjZXNzX3Rva2VuIjoiMTEwNTEwNDg4NjMxNjc2Nnx4S01kNVZuYmZnUUdQUGlKeVI0cE11Sm1yZ2siLCJzZWxlY3RpdmVfcHVibGljX2lkIjoiZW1haWx8ZW1haWwsZmJfaWR8aWQiLCJjaGFubmVsX3NlY3JldCI6Ijk3NjYzMTA0NTEwMTkxMDQ1NTM4NDA4M2U0NTZiNDhkIiwic2NvcGVfZ3JhcGgiOiJpZCxuYW1lLGVtYWlsLHBpY3R1cmUudHlwZShsYXJnZSksYmlydGhkYXksZ2VuZGVyLGZpcnN0X25hbWUsbGFzdF9uYW1lIiwic2NvcGVfcGVybWlzc2lvbiI6ImVtYWlsLHVzZXJfZ2VuZGVyLHVzZXJfYmlydGhkYXkiLCJ0ZW1wbGF0ZV9pZF90b2tlbl9pbmZvIjp7ImlkIjoiaWQiLCJlbWFpbCI6ImVtYWlsIiwibmFtZSI6Im5hbWUiLCJiaXJ0aGRheSI6ImJpcnRoZGF5IiwiZ2VuZGVyIjoiZ2VuZGVyIiwicGljdHVyZSI6InBpY3R1cmUuZGF0YS51cmwifX19LHsic29jaWFsX2xpbmUiOnsiY2hhbm5lbF9pZCI6IjE2MjE5NjYzNjciLCJjaGFubmVsX3NlY3JldCI6IjQwYWI0ZTY5MzllZTRlYjdkNTg0MDAxNzgwMmQ0N2IwIiwic2VsZWN0aXZlX3B1YmxpY19pZCI6ImVtYWlsfGVtYWlsLGxpbmVfaWR8c3ViIiwic2NvcGVfcGVybWlzc2lvbiI6InByb2ZpbGUgb3BlbmlkIGVtYWlsIiwidGVtcGxhdGVfaWRfdG9rZW5faW5mbyI6eyJpZCI6InN1YiIsImVtYWlsIjoiZW1haWwiLCJuYW1lIjoibmFtZSIsInBpY3R1cmUiOiJwaWN0dXJlIn19fV19fQ=="
    //       /*
    //      * random scenario
    //      */
    //       ptsRule: 'ewoJImNoZWNrTmV0d29yayI6IFt7CgkJInJlZ2lzdGVyQ2hhbm5lbEF2YWlsYWJpbGl0eSI6ICJhdXRvIiwKCQkibmV0d29ya0F2YWlsYWJpbGl0eSI6IFsiQUlTIl0KCX0sIHsKCQkicmVnaXN0ZXJDaGFubmVsQXZhaWxhYmlsaXR5IjogInVzZXJwd2QiLAoJCSJuZXR3b3JrQXZhaWxhYmlsaXR5IjogWyJBSVNXSUZJIiwgIk9USEVSIiwgIkFJU0ZCQiJdLAoJCSJzZXJ2aWNlSWQiOiAiQUlTUGxheSIsCgkJImFjY291bnRUeXBlIjogImFsbCIsCgkJIm90cENoYW5uZWwiOiAic21zIgoJfV0sCgkiY29uc2VudEZsYWciOiBmYWxzZSwKCSJhdXRvT2J0YWluRmxhZyI6IGZhbHNlLAoJImNhY2hpbmdUaW1lIjogIjMwIiwKCSJzYWx0IjogImZsaW0iLAoJImNhbGxCYWNrVXJsIjogImh0dHBzOi8vYWlzLXN0Zy1hcHBhZG0uZGVtby12aWRudC5jb20vb3NzL2dsb2JhbF9hY3Rpb25zL2Fpc191c2VyX25vdGlmaWNhdGlvbi8iLAoJImZsb3dUeXBlIjogIm5vcm1hbCIsCgkibG9naW5CMkIyQ0F0dGFjaEZsYWciOiB0cnVlLAoJInRlbXBsYXRlTmFtZSI6ICJ2aW1taV9sb2dpbiIsCgkiY2FsbEJhY2tNZXRob2QiOiBbIlBPU1QiXQp9'
    //     }
    //   ]
    // }
    res.req = req
    appLog.stat(stat.retResSuc(conf.cmd))
    res.header('X-Session-Id', req.headers['x-session-id'])
    // setTimeout(() => {
      return httpResponse(res, constResultCode[20000], conf.node, conf.cmd, ret, summary, detail)
    // }, 5000)
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
