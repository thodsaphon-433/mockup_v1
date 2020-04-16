module.exports = function (app) {
  const eligibleServiceCtrl = app.modules.aaf.eligibleService.eligibleServiceCtrl

  app.post(app.rout.eligibleService[0], eligibleServiceCtrl.eligibleService)
}
