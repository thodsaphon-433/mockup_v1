module.exports = function (app) {
  const confirmOneTimePasswordCtrl = app.modules.gsso.confirmOneTimePassword.confirmOneTimePasswordCtrl

  app.post(app.rout.confirmOneTimePassword[0], confirmOneTimePasswordCtrl.confirmOneTimePassword)
}
