module.exports = function (app) {
  const getPtsPartnerProfileCtrl = app.modules.getPtsPartnerProfile.getPtsPartnerProfileCtrl

  app.get(app.rout.getPtsPartnerProfile[0], getPtsPartnerProfileCtrl.getPtsPartnerProfile)
}
