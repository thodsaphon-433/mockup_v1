module.exports = function (app) {
  const decryptClientCtrl = app.modules.decryptClientId.decryptClientCtrl

  app.get(app.rout.decrypt[0], decryptClientCtrl.decryptClient)
}
