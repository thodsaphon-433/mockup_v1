module.exports = function (app) {
  const getPtsAppProfileEntryCtrl = app.modules.sdf.getPtsAppProfileEntry.getPtsAppProfileEntryCtrl

  app.get(app.rout.getPtsAppProfileEntry[0], getPtsAppProfileEntryCtrl.getPtsAppProfileEntry)
}
