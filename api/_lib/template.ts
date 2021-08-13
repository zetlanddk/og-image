
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

export function getHtml(parsedReq: ParsedRequest) {
    const { text, name, image } = parsedReq;
    let showText = text;

    if(text == "") {
        showText = `Jeg vil gerne give dig muligheden for at prøve Zetland i en måned – uden binding. Og prisen? Den bestemmer du helt selv.`
    }

    let textSize;
    const length = showText.length;
    if(length <= 20) { textSize = "text-6xl text-center pl-12" ;}
    else if(length <= 42) { textSize = "text-5xl text-center pl-12" ;}
    else if(length <= 70) { textSize = "text-4xl pl-16" ;}
    else { textSize = "pl-16 text-3xl" };

    const quoteClasses = "italic text-gray-400";
    const textWithQuotes = `<span class="quote quote--start ${quoteClasses} relative inline-block"><span class="absolute block">“</span></span>${showText}<span class="quote quote--end ${quoteClasses} relative inline-block"><span class="absolute block">”</span></span>`;


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
            font-size: 30px;
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

        .quote {
            font-size: 1.7em;
        }

        .quote--start span {
            margin-left: -0.5em;
            margin-top: -0.9em;
        }

        .quote--end span {
            margin-top: -0.3em;
        }
    </style>
    <body>
        <div class="h-screen flex">
            <div class="m-3 p-3 border-orange flex-grow flex items-center justify-start">
                <div class="flex flex-col justify-between h-full w-full">
                    <div class="relative ${textSize} text-gray-800 font-bold leading-tight flex-grow flex items-center justify-center w-full">
                        <div class="pr-12 ml-1">
                            ${emojify(
                                marked(textWithQuotes)
                            )}
                        </div>
                    </div>
                    <div class="flex justify-between items-end">
                        <div class="flex justify-start items-end">
                            ${ getImage(image) }
                            <p class="pl-3 text-base leading-none text-gray-500 mb-1">
                                <span class="font-normal">${ name }</span><br />
                                <span class="text-sm font-extralight italic ">Medlem af Zetland</span>
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
