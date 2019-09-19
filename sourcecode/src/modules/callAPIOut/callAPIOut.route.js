module.exports = function (app) {
  const callAPIOutCtrl = app.modules.callAPIOut.callAPIOutCtrl

  app.post(app.rout.callAPIOut[0], callAPIOutCtrl.callAPIOut)
}
