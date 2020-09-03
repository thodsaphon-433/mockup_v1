module.exports = function (app) {
  const getGubImpuCtrl = app.modules.sdf.getGubImpu.getGubImpuCtrl

  app.get(app.rout.getGubImpu[0], getGubImpuCtrl.getGubImpu)
}
