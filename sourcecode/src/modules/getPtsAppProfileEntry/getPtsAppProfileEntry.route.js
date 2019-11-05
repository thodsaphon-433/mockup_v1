module.exports = function (app) {
  const getPtsAppProfileEntryCtrl = app.modules.getPtsAppProfileEntry.getPtsAppProfileEntryCtrl

  app.get(app.rout.getPtsAppProfileEntry[0], getPtsAppProfileEntryCtrl.getPtsAppProfileEntry)
}
