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
      ptsAppProfileEntry: [
        {
          dn:
            "ptsAppName=vimmiottapp,ds=Service,ds=pts,subdata=services,uid=661451235871303,ds=SUBSCRIBER,o=AIS,DC=C-NTDB",
          ptsAppName: "vimmiottapp",
          ptsRule: "eyJwb2xpY3kiOiB7Im5ldHdvcmtfYXZhaWxhYmlsaXR5IjogW3sibmV0d29yayI6ICJhaXMiLCAiYXV0aGVudGljYXRlIjogW3sidHlwZSI6ICJtc2lzZG4iLCAibG9naW5fY2hhbm5lbF9hdmFpbGFiaWxpdHkiOiBbImF1dG8iXSB9LCB7InR5cGUiOiAiZmJiaWQiLCAibG9naW5fY2hhbm5lbF9hdmFpbGFiaWxpdHkiOiBbImF1dG8iLCAib3RwIl0gfSwgeyJ0eXBlIjogImRlZmF1bHQiLCAibG9naW5fY2hhbm5lbF9hdmFpbGFiaWxpdHkiOiBbImZhY2Vib29rIiwgImxpbmUiXSB9XSB9LCB7Im5ldHdvcmsiOiAiYW5vbnltb3VzIiwgImF1dGhlbnRpY2F0ZSI6IFt7InR5cGUiOiAiZGVmYXVsdCIsICJsb2dpbl9jaGFubmVsX2F2YWlsYWJpbGl0eSI6IFsiZmFjZWJvb2t8bGluZXxlbWFpbF9wYXNzd29yZCJdIH1dIH1dIH0sICJjaGVja05ldHdvcmsiOiBbeyJyZWdpc3RlckNoYW5uZWxBdmFpbGFiaWxpdHkiOiAiYXV0byIsICJuZXR3b3JrQXZhaWxhYmlsaXR5IjogWyJBSVNXSUZJIiwgIk9USEVSIiwgIkFJU0ZCQiJdLCAic2VydmljZUlkIjogIkFJU1BsYXkiLCAiYWNjb3VudFR5cGUiOiAiYWxsIiwgIm90cENoYW5uZWwiOiAic21zIn1dLCAiY29uc2VudEZsYWciOiBmYWxzZSwgImF1dG9PYnRhaW5GbGFnIjogZmFsc2UsICJmbG93VHlwZSI6ICJub3JtYWwiLCAibG9naW5CMkIyQ0F0dGFjaEZsYWciOiB0cnVlLCAidGVtcGxhdGVOYW1lIjogInZpbW1pX2xvZ2luIiwgImNhbGxCYWNrTWV0aG9kIjogWyJQT1NUIl0sICJmbG93QXZhaWxhYmlsaXR5IjogWyJzb2NpYWxfbGluZSIsICJzb2NpYWxfZ29vZ2xlIiwgImVtYWlsX3Bhc3N3b3JkIl0gfQ==",
          // ptsRule: "eyJjaGVja05ldHdvcmsiOiBbeyJyZWdpc3RlckNoYW5uZWxBdmFpbGFiaWxpdHkiOiAiYXV0byIsICJuZXR3b3JrQXZhaWxhYmlsaXR5IjogWyJBSVNXSUZJIiwgIk9USEVSIiwgIkFJU0ZCQiJdLCAic2VydmljZUlkIjogIkFJU1BsYXkiLCAiYWNjb3VudFR5cGUiOiAiYWxsIiwgIm90cENoYW5uZWwiOiAic21zIn1dLCAiY29uc2VudEZsYWciOiBmYWxzZSwgImF1dG9PYnRhaW5GbGFnIjogZmFsc2UsICJmbG93VHlwZSI6ICJub3JtYWwiLCAibG9naW5CMkIyQ0F0dGFjaEZsYWciOiB0cnVlLCAidGVtcGxhdGVOYW1lIjogInZpbW1pX2xvZ2luIiwgImNhbGxCYWNrTWV0aG9kIjogWyJQT1NUIl0sICJmbG93QXZhaWxhYmlsaXR5IjogWyJzb2NpYWxfbGluZSIsICJzb2NpYWxfZ29vZ2xlIiwgImVtYWlsX3Bhc3N3b3JkIl0sICJwb2xpY3kiOiB7InRlbXBsYXRlX2Zvcm0iOiAic2lhbXBpd2F0IiwgInNzbyI6ICJ0cnVlIiwgImlzX25hdGl2ZV9hcHAiOiBmYWxzZSwgIm5ldHdvcmtfYXZhaWxhYmlsaXR5IjogW3sibmV0d29yayI6ICJhaXMiLCAiYXV0aGVudGljYXRlIjogW3sidHlwZSI6ICJtc2lzZG4iLCAibG9naW5fY2hhbm5lbF9hdmFpbGFiaWxpdHkiOiBbImF1dG8iXSB9LCB7InR5cGUiOiAiZmJiaWQiLCAibG9naW5fY2hhbm5lbF9hdmFpbGFiaWxpdHkiOiBbImF1dG8iLCJvdHAiXSB9LCB7InR5cGUiOiAiZGVmYXVsdCIsICJsb2dpbl9jaGFubmVsX2F2YWlsYWJpbGl0eSI6IFsiZmFjZWJvb2siLCJsaW5lIl0gfSBdIH0sIHsibmV0d29yayI6ICJhbm9ueW1vdXMiLCAiYXV0aGVudGljYXRlIjogW3sidHlwZSI6ICJkZWZhdWx0IiwgImxvZ2luX2NoYW5uZWxfYXZhaWxhYmlsaXR5IjogWyJmYWNlYm9va3xsaW5lfGVtYWlsX3Bhc3N3b3JkIl0gfSBdIH0gXSB9LCAiY2hhbm5lbHMiOiBbeyJzb2NpYWxfZmIiOiB7ImFwcElkIjogIjI2NTc2MTc4NDE0Nzk3MCIsICJhcHBBY2NjZXNzVG9rZW4iOiAiMjY1NzYxNzg0MTQ3OTcwfGN2SkJzZU1WUHRsdHhYWXY1bU9PMHVpYkpLUSIsICJzZWxlY3RpdmVQdWJsaWNJZCI6ICJlbWFpbHxlbWFpbCxmYl9pZHxpZCIsICJjaGFubmVsU2VjcmV0IjogImQxNWYyZGZkNzcyOWQ0ODZkYzg4OGNjNGUwNjM3YjRkIiwgInNjb3BlR3JhcGgiOiAiaWQsbmFtZSxlbWFpbCxwaWN0dXJlLnR5cGUobGFyZ2UpLGJpcnRoZGF5LGdlbmRlcixmaXJzdF9uYW1lLGxhc3RfbmFtZSIsICJzY29wZVBlcm1pc3Npb24iOiAiZW1haWwsdXNlcl9nZW5kZXIsdXNlcl9iaXJ0aGRheSIsICJ0ZW1wbGF0ZUlkVG9rZW5JbmZvIjogeyJpZCI6ICJpZCIsICJlbWFpbCI6ICJlbWFpbCIsICJuYW1lIjogIm5hbWUiLCAiYmlydGhkYXkiOiAiYmlydGhkYXkiLCAiZ2VuZGVyIjogImdlbmRlciIsICJwaWN0dXJlIjogInBpY3R1cmUuZGF0YS51cmwifSB9IH0sIHsic29jaWFsX2xpbmUiOiB7ImNoYW5uZWxJZCI6ICIxNjEwNzg1NjIyIiwgImNoYW5uZWxTZWNyZXQiOiAiY2IzNjJiMmRlYThhODgyZWFkOWUxMzJlM2EwNDljZTUiLCAic2VsZWN0aXZlUHVibGljSWQiOiAiZW1haWx8ZW1haWwsbGluZV9pZHxzdWIiLCAic2NvcGVQZXJtaXNzaW9uIjogInByb2ZpbGUgb3BlbmlkIGVtYWlsIiwgInRlbXBsYXRlSWRUb2tlbkluZm8iOiB7ImlkIjogInN1YiIsICJlbWFpbCI6ICJlbWFpbCIsICJuYW1lIjogIm5hbWUiLCAicGljdHVyZSI6ICJwaWN0dXJlIn0gfSB9LCB7InNvY2lhbF93ZWNoYXQiOiB7ImFwcElkIjogInd4OTRiYjRjZjQ4YmVmYjA5YyIsICJzZWNyZXQiOiAiNGU2YTczYWE3NWFkNWFkZGUyMDEwMjhjYjU5ODBlZTYiLCAic2VsZWN0aXZlUHVibGljSWQiOiAid2VjaGF0X2lkfG9wZW5pZCIsICJzY29wZVBlcm1pc3Npb24iOiAic25zYXBpX3VzZXJpbmZvIiwgImxhbmciOiAiZW5fVVMifSB9LCB7ImVtYWlsX3Bhc3N3b3JkIjogeyJzZWxlY3RpdmVfcHVibGljX2lkIjogImVtYWlsIiwgImFjdGl2YXRpb25fbGlua19ob3N0IjogInd3dy5haXMuY28udGgiLCAidGVtcGxhdGVfaWRfdG9rZW5faW5mbyI6IHsiZmlyc3RuYW1lIjogInN1YnNjcmliZXJQcm9maWxlLmdpdmVuTmFtZSIsICJsYXN0bmFtZSI6ICJzdWJzY3JpYmVyUHJvZmlsZS5zdXJuYW1lIn0gfSB9IF0gfQ==",
          objectClass: "ptsAppProfileEntry"
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
