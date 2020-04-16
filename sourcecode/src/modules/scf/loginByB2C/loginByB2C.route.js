module.exports = function (app) {
  const loginByB2CCtrl = app.modules.scf.loginByB2C.loginByB2CCtrl

  app.post(app.rout.loginByB2C[0], loginByB2CCtrl.loginByB2C)
}
