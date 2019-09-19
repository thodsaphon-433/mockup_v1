module.exports = function (app) {
  const messageCtrl = app.modules.message.messageCtrl

  app.post(app.rout.message[0], messageCtrl.message)
}
