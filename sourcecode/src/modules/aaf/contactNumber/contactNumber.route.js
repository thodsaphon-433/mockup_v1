module.exports = function (app) {
  const contactNumberCtrl = app.modules.aaf.contactNumber.contactNumberCtrl;

  app.get(app.rout.contactNumber[0], contactNumberCtrl.contactNumber);
}; 
