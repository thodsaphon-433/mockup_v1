module.exports = function (app) {
  const postRSAKeyCtrl = app.modules.kms.postRSAKey.postRSAKeyCtrl

  app.post(app.rout.postRSAKey[0], postRSAKeyCtrl.postRSAKey)
}
