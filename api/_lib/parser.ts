import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { image, text, name, first_name } = (query || {});
    
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    extension = arr.pop() as string;

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text as string || ''),
        name: name as string || 'John Doe',
        firstName: first_name as string || 'John',
        image: image as string,
    };
    return parsedRequest;
}

