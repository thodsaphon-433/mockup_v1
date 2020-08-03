module.exports = function (app) {
  const checkPublicIdAvailabilityV3Ctrl = app.modules.aaf.checkPublicIdAvailabilityV3.checkPublicIdAvailabilityV3Ctrl

  app.post(app.rout.checkPublicIdAvailabilityV3[0], checkPublicIdAvailabilityV3Ctrl.checkPublicIdAvailabilityV3)
}
