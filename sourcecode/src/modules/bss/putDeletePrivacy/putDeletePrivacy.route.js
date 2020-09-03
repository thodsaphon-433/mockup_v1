module.exports = function (app) {
  const putDeletePrivacyCtrl = app.modules.bss.putDeletePrivacy.putDeletePrivacyCtrl

  app.put(app.rout.putDeletePrivacy[0], putDeletePrivacyCtrl.putDeletePrivacy)
}
