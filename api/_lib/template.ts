
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
            font-size: 33px;
        }
        body {
            background-color: #FAF8F0;
            padding: 0;
            margin: 0;
        }

        .border-orange {
            border: 4px solid #FA4113;
        }

        .emoji {
            height: 1.3em;
            display: inline-block;
            padding-bottom: 0.3em;
            
        }
    </style>
    <body>
        <img class="fixed w-20 bottom-6 right-6" src="https://pdf.zetland.dk/gift_card_images/medium-logo-orange.png" />
        <div class="h-screen flex">
            <div class="m-3 p-3 border-orange flex-grow flex items-center justify-start">
                <div class="flex">
                    <img class="h-64 pl-4 pr-6" src="https://height-files.storage.googleapis.com/5c0b5de0-689a-447c-9168-a7b523e4c97a.png" />
                    <div class="flex flex-col justify-center items-start">
                        ${ getImage(image) }
                        <p class="mt-2 text-xs leading-tight text-gray-500 font-extralight">
                            ${ name }<br />
                            Medlem af Zetland
                        </p>
                        <div class="text-base text-gray-800 mt-4 leading-tight quote">
                            ${emojify(
                                marked(text)
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string) {
    return `<img
        class="rounded-full h-12 -mt-8"
        src="${sanitizeHtml(src)}"
    />`
}
