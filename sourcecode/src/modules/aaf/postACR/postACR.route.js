module.exports = function (app) {
  const postACRCtrl = app.modules.aaf.postACR.postACRCtrl

  app.post(app.rout.postACR[0], postACRCtrl.postACR)
}
