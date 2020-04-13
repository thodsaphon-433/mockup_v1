module.exports = function (app) {
  const eligibleServiceCtrl = app.modules.eligibleService.eligibleServiceCtrl

  app.post(app.rout.eligibleService[0], eligibleServiceCtrl.eligibleService)
}
