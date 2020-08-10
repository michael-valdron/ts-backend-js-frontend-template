import ejs = require('ejs');
import fs = require('fs');
import path = require('path');
import { IncomingMessage, ServerResponse } from 'http';
import {VIEWS, BASE_FILES, getInternalError} from '.';

export function get(req: IncomingMessage, res: ServerResponse) {
    fs.readFile(path.join(VIEWS, 'index.ejs'), (err, content) => {
        if (!err) {
            const html = ejs.render(content.toString(), 
                {'title': 'Home Page', 'basefiles': BASE_FILES});

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        } else {
            getInternalError(res, err);
        }
    });
}