module.exports = function (app) {
  const getPtsServiceProfileEntryCtrl = app.modules.getPtsServiceProfileEntry.getPtsServiceProfileEntryCtrl

  app.get(app.rout.getPtsServiceProfileEntry[0], getPtsServiceProfileEntryCtrl.getPtsServiceProfileEntry)
}
