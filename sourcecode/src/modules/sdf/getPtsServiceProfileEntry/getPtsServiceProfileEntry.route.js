module.exports = function (app) {
  const getPtsServiceProfileEntryCtrl = app.modules.sdf.getPtsServiceProfileEntry.getPtsServiceProfileEntryCtrl

  app.get(app.rout.getPtsServiceProfileEntry[0], getPtsServiceProfileEntryCtrl.getPtsServiceProfileEntry)
}
