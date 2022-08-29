import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    let { pathname, query } = parse(req.url || '/', true);

    if( !query.first_name ) {
        const splitPath = (pathname || "").split("/");
        splitPath.shift();
        splitPath.shift();
        splitPath.shift();
        const base64 = (splitPath.join('/').split(".") || [] )[0];
        const json = Buffer.from(base64, 'base64').toString('utf8');
        console.log({ json });
        query = JSON.parse(json)
    }

    const { image, text, name, first_name, theme } = (query || {});

    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    extension = arr.pop() as string;

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text as string || ''),
        name: name as string || 'Zetland medlem',
        firstName: first_name as string || 'Et medlem',
        theme: theme as string || 'red',
        image: image as string,
    };
    return parsedRequest;
}

