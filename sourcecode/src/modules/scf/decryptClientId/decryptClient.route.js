module.exports = function (app) {
  const decryptClientCtrl = app.modules.scf.decryptClientId.decryptClientCtrl

  app.get(app.rout.decrypt[0], decryptClientCtrl.decryptClient)
}
