module.exports = function (app) {
  const subscriptionsProfileCtrl = app.modules.aaf.subscriptionsProfile.subscriptionsProfileCtrl

  app.post(app.rout.subscriptionsProfile[0], subscriptionsProfileCtrl.subscriptionsProfile)
}
