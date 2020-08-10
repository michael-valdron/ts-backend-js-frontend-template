import http = require('http');

import routes = require('./routes');

const app = http.createServer(routes.handler);

export default app;
