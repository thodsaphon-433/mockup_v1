module.exports = function (app) {
  const getSubscriberProfileCtrl = app.modules.sdf.getSubscriberProfile.getSubscriberProfileCtrl

  app.get(app.rout.getSubscriberProfile[0], getSubscriberProfileCtrl.getSubscriberProfile)
}
