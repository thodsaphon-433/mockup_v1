module.exports = function (app) {
  const createPrivacyCtrl = app.modules.bss.createPrivacy.createPrivacyCtrl

  app.post(app.rout.privacy[0], createPrivacyCtrl.createPrivacy)
}
