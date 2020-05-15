module.exports = function (app) {
  const fbbidOTPCtrl = app.modules.fbbidOTP.fbbidOTPCtrl

  app.get(app.rout.fbbidOTP[0], fbbidOTPCtrl.fbbidOTP)
}
