import path = require('path');
import { Request, Response } from 'express';
import {VIEWS, BASE_FILES} from '.';

export function get(req: Request, res: Response) {
    res.render(path.join(VIEWS, 'index'), 
        {'title': 'Home Page', 'basefiles': BASE_FILES});
}