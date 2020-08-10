import express = require('express');

import routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');

routes.handler(app);

export default app;
