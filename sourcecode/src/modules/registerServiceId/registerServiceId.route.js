module.exports = function (app) {
  const registerServiceIdCtrl = app.modules.registerServiceId.registerServiceIdCtrl

  app.post(app.rout.registerServiceId[0], registerServiceIdCtrl.registerServiceId)
}
