module.exports = function (app) {
  const checkPublicIdAvailabilityCtrl = app.modules.aaf.checkPublicIdAvailability.checkPublicIdAvailabilityCtrl

  app.post(app.rout.checkPublicIdAvailability[0], checkPublicIdAvailabilityCtrl.checkPublicIdAvailability)
}
