module.exports = function (app) {
  const getGupImpuCtrl = app.modules.sdf.getGupImpu.getGupImpuCtrl

  app.get(app.rout.getGupImpu[0], getGupImpuCtrl.getGupImpu)
}
