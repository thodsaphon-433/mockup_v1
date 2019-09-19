module.exports = function (app) {
  const sacfSessionProfileCtrl = app.modules.sacfSessionProfile.sacfSessionProfileCtrl

  app.post(app.rout.sacfSessionProfile[0], sacfSessionProfileCtrl.sacfSessionProfile)
}
