module.exports = function (app) {
  const redirectCtrl = app.modules.redirect.redirectCtrl

  app.get(app.rout.redirect[0], redirectCtrl.redirect)
}
