module.exports = function (app) {
  const deliverCtrl = app.modules.deliver.deliverCtrl

  app.post(app.rout.deliver[0], deliverCtrl.deliver)
  app.post(app.rout.deliver[1], deliverCtrl.deliver)
}
