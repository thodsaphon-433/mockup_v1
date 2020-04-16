module.exports = function (app) {
  const dhcpCtrl = app.modules.dhcp.checkFbbId.dhcpCtrl

  app.post(app.rout.dhcp[0], dhcpCtrl.dhcp)
}
