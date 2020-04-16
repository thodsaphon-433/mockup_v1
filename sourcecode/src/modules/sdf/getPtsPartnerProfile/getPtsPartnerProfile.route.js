module.exports = function (app) {
  const getPtsPartnerProfileCtrl = app.modules.sdf.getPtsPartnerProfile.getPtsPartnerProfileCtrl

  app.get(app.rout.getPtsPartnerProfile[0], getPtsPartnerProfileCtrl.getPtsPartnerProfile)
}
