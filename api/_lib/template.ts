
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

export function getHtml(parsedReq: ParsedRequest) {
    const { text, name, firstName, image } = parsedReq;
    let showText = text;

    if(text == "") {
        showText= `Jeg vil gerne give dig muligheden for at prøve Zetland i en måned – uden binding. Og prisen? Den bestemmer du helt selv.`
    }

    const quoteClasses = "text-6xl italic text-gray-400";
    showText = `<span class="quote quote--start ${quoteClasses} block absolute">“</span>${showText}<span class="qoute quote--end ${quoteClasses} relative inline-block"><span class="absolute mt-5 block">”</span></span>`;

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
            font-size: 32px;
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

        .qoute {
            line-height: 0;
        }
        .quote--start {
            margin-left: -0.42em;
            margin-top: -0.25em;
        }
    </style>
    <body>
        <div class="h-screen flex">
            <div class="m-3 p-3 border-orange flex-grow flex items-center justify-start">
                <div class="flex flex-col justify-between h-full">
                    <div class="relative text-3xl text-gray-800 leading-tight flex-grow flex items-center">
                        <div class="pl-16 pr-6 ml-1">
                            ${emojify(
                                marked(showText)
                            )}
                        </div>
                    </div>
                    <div class="flex justify-between items-end">
                        <div class="flex justify-start items-end">
                            ${ getImage(image) }
                            <p class="pl-3 text-base leading-none text-gray-500 font-extralight">
                                ${ name }<br />
                                <span class="text-sm italic text-gray-400">Medlem af Zetland</span>
                            </p>
                        </div>
                        <img class="h-5" src="https://pdf.zetland.dk/gift_card_images/medium-logo-orange.png" />
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string) {
    return `<img
        class="rounded-full h-14"
        src="${sanitizeHtml(src)}"
    />`
}
