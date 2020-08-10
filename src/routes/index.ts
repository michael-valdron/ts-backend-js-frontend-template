import express = require('express');
import path = require('path');
import { Express, Request, Response } from 'express';

import home = require('./home');

const PUBLIC = path.join(__dirname, '../public');
export const VIEWS = path.join(__dirname, '../views');
const HEADER = path.join(VIEWS, 'header.ejs');
const FOOTER = path.join(VIEWS, 'footer.ejs');
export const BASE_FILES = {
    'header': HEADER, 
    'footer': FOOTER
};

export function handler(app: Express) {
    app.get('/', home.get);

    app.get('/404', (req, res, next) => {
        next();
    });

    app.get('/403', (req, res, next) => {
        const err = new Error('not allowed!');
        const status = {status: 403};

        next({...err, ...status});
    });

    app.get('/500', (req, res, next) => {
        next(new Error('internal error'));
    });

    app.use(express.static(PUBLIC));
    
    app.use(getNotFound);
    
    app.use(getInternalError);
}

function getNotFound(req: Request, res: Response) {
    res.status(404);

    res.format({
        html: () => {
            res.render(path.join(VIEWS, '404.ejs'), 
                { title: "404 Not Found", url: req.url, basefiles: BASE_FILES});
        },
        json: () => {
            res.json({ error: '404 Not Found' });
        },
        default: () => {
            res.type('txt').send('404 Not Found');
        }
    });
}

function getInternalError(err: any, res: Response) {
    res.status(err.status || 500);
    
    switch (res.statusCode) {
        case 403:
            res.type('txt').send('not allowed!');
            break;
        default:
            const timestamp = new Date();
            console.log(`${timestamp} ${err.name}:\n ${err.message}`);
            res.type('txt').send('internal error');
            break;
    }
}

