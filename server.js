import express from 'express';
import morgan from 'morgan';
import bottleCapsController from './controllers/bottleCapsController.js';

const app = express();
const apiPort = 3000;

// for logging to the console which routes are hit
app.use(morgan('combined'));

// adding route controllers
app.use('/bottleCaps', bottleCapsController);

// starting up the app
app.listen(apiPort, () => {
  console.log('Express server listening on port ' + apiPort);
});
