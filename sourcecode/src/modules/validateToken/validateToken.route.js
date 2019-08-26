module.exports = function (app) {
  const validateTokenCtrl = app.modules.validateToken.validateTokenCtrl

  app.post(app.rout.validateToken[0], validateTokenCtrl.validateToken)
}
