const logg = require('commonlog-kb')
// const messageFunc = require('./decryptClient.func')
const constResultCode = require('../../constants/resultCode.const')
const httpResponse = require('../../utils/httpUtil').httpResponse
const httpResponseXml = require('../../utils/httpUtil').httpResponseXml
const stat = require('../../constants/stat.const')
// var convert = require('xml-js')
// const genUtil = require('../../utils/genUtil')

exports.dhcp = function (req, res) {
  /**  ========================== [START VALIABLE] ========================== */
  const appLog = req.logkb
  const body = req.body

  const conf = {
    nodeName: 'mockup',
    cmd: 'DHCP',
    requ: 'CLIENT'
  }

  // [INIT SESSION]
  const Xsession = req.id
  const Xrtid = req.xrtid
  /**  ========================== [END VALIABLE] ========================== */

  /**  ========================== [START LOG] ========================== */
  appLog.info('==========> DHCP proccessing <==========')
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

    const ret = '<?xml version="1.0" standalone="" ?>' +
                '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope">' +
                  '<soap:Body>' +
                    '<ns2:queryByIpAddressResponse xmlns:ns2="http://ws.fbb.ais.co.th/">' +
                      '<return>' +
                        '<customerInfo>' +
                          '<customerId>881234567;8</customerId>' +
                          '<customerName>QAtest@ais.co.th</customerName>' +
                          '<customerStatus>ACTIVE</customerStatus>' +
                          '<latitude>0</latitude>' +
                          '<longitude>0</longitude>' +
                          '<onlineStatus>Online</onlineStatus>' +
                          '<password>1234</password>' +
                          '<qosProfileId>L200</qosProfileId>' +
                          '<qosProfileName>100/100</qosProfileName>' +
                        '</customerInfo>' +
                        '<deviceInfo />' +
                        '<dslInfo />' +
                        '<fttxInfo />' +
                        '<onlineInfo>' +
                          '<acctInputOctets>1291460452</acctInputOctets>' +
                          '<acctInputPackets>4101338</acctInputPackets>' +
                          '<acctInterimTime>1474-02-11 17:31:28.185838</acctInterimTime>' +
                          '<acctOutputOctets>2155400923</acctOutputOctets>' +
                          '<acctOutputPackets>3799656</acctOutputPackets>' +
                          '<acctSessionId>FBB_TTC04201300000000d63ff0010472</acctSessionId>' +
                          '<acctSessionTime>687600</acctSessionTime>' +
                          '<acctStartTime>1474-02-03 18:31:41.354217</acctStartTime>' +
                          '<acctStatusType>3</acctStatusType>' +
                          '<acctTerminationCause>0</acctTerminationCause>' +
                          '<callingStationId>fc:4d:d4:f4:65:62</callingStationId>' +
                          '<customerId>8850002795</customerId>' +
                          '<framedIpAddress>10.104.146.81</framedIpAddress>' +
                          '<nasId>FBB_TTC_BRAS</nasId>' +
                          '<nasIpAddress>10.104.140.70</nasIpAddress>' +
                          '<nasPortId>FBB_TTC_BRAS eth 0/4/2/1:3000</nasPortId>' +
                          '<onlineCause>SUCCESS</onlineCause>' +
                        '</onlineInfo>' +
                        '<wifiInfo />' +
                      '</return>' +
                    '</ns2:queryByIpAddressResponse>' +
                  '</soap:Body>' +
                '</soap:Envelope>'

    // var retObj = { Body: {
    //   queryByIpAddressResponse: {
    //     return: {
    //       customerInfo: {
    //         customerId: '8850002795',
    //         customerName: 'QAtest@ais.co.th',
    //         customerStatus: 'ACTIVE',
    //         latitude: '0',
    //         longitude: '0',
    //         onlineStatus: 'Online',
    //         password: '1234',
    //         qosProfileId: 'L200',
    //         qosProfileName: '100/100'
    //       },
    //       deviceInfo: [],
    //       dslInfo: [],
    //       fttxInfo: [],
    //       onlineInfo: {
    //         acctInputOctets: '1291460452',
    //         acctInputPackets: '4101338',
    //         acctInterimTime: '1474-02-11 17:31:28.185838',
    //         acctOutputOctets: '2155400923',
    //         acctOutputPackets: '3799656',
    //         acctSessionId: 'FBB_TTC04201300000000d63ff0010472',
    //         acctSessionTime: '687600',
    //         acctStartTime: '1474-02-03 18:31:41.354217',
    //         acctStatusType: '3',
    //         acctTerminationCause: '0',
    //         callingStationId: 'fc:4d:d4:f4:65:62',
    //         customerId: '8850002795',
    //         framedIpAddress: '10.104.146.81',
    //         nasId: 'FBB_TTC_BRAS',
    //         nasIpAddress: '10.104.140.70',
    //         nasPortId: 'FBB_TTC_BRAS eth 0/4/2/1:3000',
    //         onlineCause: 'SUCCESS'
    //       },
    //       wifiInfo: []
    //     }
    //   }
    // }
    // }
    // retObj = JSON.stringify(retObj)
    // var options = { compact: true, ignoreComment: true, spaces: 4 }
    // var result = convert.json2xml(retObj, options)
    // console.log(result)

    res.req = req
    appLog.stat(stat.retResSuc(conf.cmd))
    res.set(
      {
        'Content-Type': 'application/soap+xml; charset=UTF-8'
      }
    )
    return httpResponseXml(res, constResultCode[20000], conf.node, conf.cmd, ret, summary, detail)
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
