module.exports = function (app) {
  const sacfSessionProfileCtrl = app.modules.sdf.sacfSessionProfile.sacfSessionProfileCtrl

  app.post(app.rout.sacfSessionProfile[0], sacfSessionProfileCtrl.sacfSessionProfile)
}
