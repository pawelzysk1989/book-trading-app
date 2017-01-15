const Authentication = require('./controllers/authenticationController');
const bookController = require('./controllers/bookController');
const settingsController = require('./controllers/settingsController');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.post('/addBook', requireAuth, bookController.addBook);
  app.get('/getMyBooks', requireAuth, bookController.getMyBooks);
  app.post('/removeBook', requireAuth, bookController.removeBook);
  app.get('/searchForBook', requireAuth, bookController.searchForBook);
  app.get('/getSettings', requireAuth, settingsController.getSettings);
  app.post('/saveSettings', requireAuth, settingsController.saveSettings);
  app.post('/changePassword', requireAuth, settingsController.changePassword);
}
