module.exports = function (app) {
  const dhcpCtrl = app.modules.dhcp.dhcpCtrl

  app.post(app.rout.dhcp[0], dhcpCtrl.dhcp)
}
