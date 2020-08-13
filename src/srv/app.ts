import express = require('express');

import routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');

app.use('/', routes.router());

export default app;
