module.exports = function (app) {
  const obtainAuthorityListCtrl = app.modules.obtainAuthorityList.obtainAuthorityListCtrl

  app.post(app.rout.obtainAuthorityList[0], obtainAuthorityListCtrl.obtainAuthorityList)
}
