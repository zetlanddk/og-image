
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

export function getHtml(parsedReq: ParsedRequest) {
    const { text, name, image } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <style>
      @import 'https://pdf.zetland.dk/fonts/fonts.css';
      html {
        orientation: portrait;
        font-family: 'Italian Plate No2','Gotham SSm A','Gotham SSm B',Arial,Verdana,sans-serif;
        margin: 0;
        font-size: 38px;
      }
      body {
        background-color: #fff;
        padding: 0;
        margin: 0;
      }
    </style>
    <body>
        <div class="h-screen flex items-center justify-start pl-3">
            ${ getImage(image) }
            <div class="flex flex-col pt-3 pr-6 pl-3">
                <p class="font-serif text-6xl leading-3 text-red-600">
                    &ldquo;
                </p>
                <p class="">
                    ${emojify(
                        marked(text)
                    )}
                </p>
                <p>${ name }</p>
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string) {
    return `<img
        class="rounded-full h-2/3"
        src="${sanitizeHtml(src)}"
    />`
}
