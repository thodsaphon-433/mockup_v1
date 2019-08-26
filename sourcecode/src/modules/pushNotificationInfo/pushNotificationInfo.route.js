module.exports = function (app) {
  const pushNotificationInfoCtrl = app.modules.pushNotificationInfo.pushNotificationInfoCtrl

  app.post(app.rout.pushNotificationInfo[0], pushNotificationInfoCtrl.pushNotificationInfo)
}
