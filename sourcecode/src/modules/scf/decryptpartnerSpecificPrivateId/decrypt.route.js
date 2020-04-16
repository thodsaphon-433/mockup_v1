module.exports = function (app) {
  const decryptCtrl = app.modules.scf.decryptpartnerSpecificPrivateId.decryptCtrl

  app.get(app.rout.decryptPSPid[0], decryptCtrl.decrypt)
}
