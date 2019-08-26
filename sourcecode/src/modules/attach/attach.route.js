module.exports = function (app) {
  const attachCtrl = app.modules.attach.attachCtrl

  app.post(app.rout.attach[0], attachCtrl.attach)
}
