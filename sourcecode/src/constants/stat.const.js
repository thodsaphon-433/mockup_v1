module.exports = Object.freeze({
  /**
   * [Received_Unknown_REQ]
   */
  revUknReq: 'AEMF Recevied UnknownURL Request',
  retUknErr: 'AEMF Returned UnknownURL Error',

  /**
   * [Received_from_client]
   */
  recvReq: (cmd) => `AEMF Received ${cmd.replace(/^\w/, c => c.toUpperCase())} Request`,
  recvBadReq: (cmd) => `AEMF Received Bad ${cmd.replace(/^\w/, c => c.toUpperCase())} Request`,

  /**
   * [Return_from_client]
   */
  retResSuc: (cmd) => `AEMF Returned ${cmd.replace(/^\w/, c => c.toUpperCase())} Success`,
  retResErr: (cmd) => `AEMF Returned ${cmd.replace(/^\w/, c => c.toUpperCase())} Error`,
  retResSysErr: (cmd) => `AEMF Returned ${cmd.replace(/^\w/, c => c.toUpperCase())} System Error`,

  /**
   * [Sent_REQ_To_Node]
   */
  sentReq: (desNode, cmd) => `AEMF Sent ${desNode + ' ' + cmd.replace(/^\w/, c => c.toUpperCase())} Request`,

  /**
   * [Recv_RES_From_Node(Success)]
   */
  recvResSuc: (desNode, cmd) => `AEMF Recv ${desNode + ' ' + cmd.replace(/^\w/, c => c.toUpperCase())} Response`,

  /**
   * [Recv_RES_From_Node(Error)]
   */
  recvResErr: (desNode, cmd) => `AEMF Recv ${desNode + ' ' + cmd.replace(/^\w/, c => c.toUpperCase())} Error Response`,

  /**
   * [Recv_RES_From_Node(Error_conn)]
   */
  recvResConErr: (desNode, cmd) => `AEMF Recv ${desNode + ' ' + cmd.replace(/^\w/, c => c.toUpperCase())} Connection Error`,
  /**
   * [Recv_RES_From_Node(timeout)]
   */
  recvResTimeout: (desNode, cmd) => `AEMF Recv ${desNode + ' ' + cmd.replace(/^\w/, c => c.toUpperCase())} Timeout`,

  /**
   * [Recv_RES_From_Node(Bad_RES)]
   */
  recvBadRes: (desNode, cmd) => `AEMF Recv ${desNode + ' Bad ' + cmd.replace(/^\w/, c => c.toUpperCase())} Response`
})
