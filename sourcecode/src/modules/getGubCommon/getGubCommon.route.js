module.exports = function (app) {
  const getGubCommonCtrl = app.modules.getGubCommon.getGubCommonCtrl

  app.get(app.rout.getGubCommon[0], getGubCommonCtrl.getGubCommon)
}
