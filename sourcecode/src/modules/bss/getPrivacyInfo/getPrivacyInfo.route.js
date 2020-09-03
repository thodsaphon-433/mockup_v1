module.exports = function (app) {
  const getPrivacyInfoCtrl = app.modules.bss.getPrivacyInfo.getPrivacyInfoCtrl

  app.get(app.rout.getPrivacyInfo[0], getPrivacyInfoCtrl.getPrivacyInfo)
}
