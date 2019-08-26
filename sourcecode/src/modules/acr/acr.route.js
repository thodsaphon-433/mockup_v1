module.exports = function (app) {
  const acrCtrl = app.modules.acr.acrCtrl

  app.post(app.rout.acrfbb[0], acrCtrl.ACR)
  app.post(app.rout.acrmsisdn[0], acrCtrl.ACR)
}
