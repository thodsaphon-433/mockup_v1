module.exports = function (app) {
  const pushNotificationInfoCtrl = app.modules.sacf.pushNotificationInfo.pushNotificationInfoCtrl

  app.post(app.rout.pushNotificationInfo[0], pushNotificationInfoCtrl.pushNotificationInfo)
}
