import ejs = require('ejs');
import fs = require('fs');
import path = require('path');
import mimetypes = require('mime-types');
import { IncomingMessage, ServerResponse } from 'http';

import home = require('./home');

const PUBLIC = path.join(__dirname, '../public');
export const VIEWS = path.join(__dirname, '../views');
const HEADER = path.join(VIEWS, 'header.ejs');
const FOOTER = path.join(VIEWS, 'footer.ejs');
export const BASE_FILES = {
    'header': HEADER, 
    'footer': FOOTER
};

export function handler(req: IncomingMessage, res: ServerResponse) {
    const route = (req.url === undefined) ? '/' : req.url;
    if (route === '/') {
        home.get(req, res);
    } else {
        fs.readFile(path.join(PUBLIC, route), (err, content) => {
            if (!err) {
                getPublic(path.join(PUBLIC, route), content, res);
            } else {
                getNotFound(res);
            }
        });
    }
}

function getPublic(route: string, content: Buffer, res: ServerResponse) {
    let fileType = mimetypes.lookup(route);

    fileType = (!fileType) ? 'text/plain' : fileType;

    res.writeHead(200, {'Content-Type': fileType});
    res.write(content);
    res.end();
}

function getNotFound(res: ServerResponse) {
    fs.readFile(path.join(VIEWS, "404.ejs"), (err, content) => {
        if (!err) {
            const html = ejs.render(content.toString(), 
                {'title': '404 Page Not Found', 'basefiles': BASE_FILES});

            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(html);
            res.end();
        } else {
            getInternalError(res, err);
        }
    });
}

export function getInternalError(res: ServerResponse, err: NodeJS.ErrnoException) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.write(`500: ${err.message}.`);
    res.end();
}

