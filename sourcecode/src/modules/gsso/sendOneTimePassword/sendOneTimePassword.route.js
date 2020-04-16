module.exports = function (app) {
  const sendOneTimePasswordCtrl = app.modules.gsso.sendOneTimePassword.sendOneTimePasswordCtrl

  app.post(app.rout.sendOneTimePassword[0], sendOneTimePasswordCtrl.sendOneTimePassword)
}
