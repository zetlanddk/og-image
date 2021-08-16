
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

export function getHtml(parsedReq: ParsedRequest) {
    const { text, name, image, firstName } = parsedReq;
    let showText, isQoute;

    const debug = false;

    let textSize;

    if(text == "") {
        isQoute = false;

        showText = `${firstName} vil gerne give dig muligheden for at prøve Zetland i en måned – uden binding. Og prisen? Den bestemmer du helt selv.`

        textSize = 'text-2xl'
    } else {
        isQoute = true;

        const length = text.length;
        if(length <= 15) { textSize = "text-6xl text-center pl-14" ;}
        else if(length <= 39) { textSize = "text-5xl text-center pl-14" ;}
        else if(length <= 70) { textSize = "text-4xl pl-16" ;}
        else { textSize = "pl-16 text-3xl"; }

        const quoteClasses = "italic text-gray-400";
        const textWithQuotes = `<span class="quote quote--start ${quoteClasses} relative inline-block"><span class="absolute block">“</span></span>${text}<span class="quote quote--end ${quoteClasses} relative inline-block"><span class="absolute block">”</span></span>`;

        showText = textWithQuotes;
    }



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
        <img class="h-5 fixed bottom-6 right-6" src="https://pdf.zetland.dk/gift_card_images/medium-logo-orange.png" />
        <div class="h-screen flex">
            <div class="m-3 p-3 border-orange flex-grow flex items-center justify-start">
                ${ isQoute ? "" : '<img class="h-72 pl-8 pr-8" src="https://height-files.storage.googleapis.com/5c0b5de0-689a-447c-9168-a7b523e4c97a.png" />' }

                <div class="flex ${ isQoute ? "flex-col justify-between" : "flex-col-reverse justify-center" } h-full w-full">
                    <div class="relative ${textSize} text-gray-800 ${ isQoute ? "font-bold flex-grow mt-2" : "" } leading-tight flex items-center justify-center w-full">
                        <div class="pr-14 ml-1">
                            ${emojify(
                                marked(showText)
                            )}
                        </div>
                    </div>
                    <div class="flex justify-between items-end ${isQoute ? "" : "mb-6"}">
                        <div class="flex justify-start items-end">
                            ${ getImage(image) }
                            <p class="pl-3 text-base leading-none text-gray-500 mb-1">
                                <span class="font-normal">${ name }${ debug ? `${length} ${textSize}` : ''}</span><br />
                                <span class="text-sm font-extralight italic ">Medlem af Zetland</span>
                            </p>
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
        class="rounded-full h-14"
        src="${sanitizeHtml(src)}"
    />`
}
