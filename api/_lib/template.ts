
import marked from 'marked';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest, Theme } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

export function getHtml(parsedReq: ParsedRequest) {
    const { text, name, image, firstName, theme } = parsedReq;
    let showText;

    const debug = false;

    let textSize: number, textClasses;

    let length;

    const themes: { [key: string]: Theme } = {
        red: {
            quoteColor: "#F5CC5B",
            backgroundColor: "#FF3508",
            thirdElementColor: "#FF5530",
            primaryTextColor: "#F5CC5B",
            secondaryTextColor: "#FDF2D6",
            logoColor: "#FDF2D6"
        },
        yellow: {
            quoteColor: "#FF3508",
            backgroundColor: "#F6CC5C",
            thirdElementColor: "#F7D474",
            primaryTextColor: "#FF3508",
            secondaryTextColor: "#222222",
            logoColor: "#FF3508"
        },
        green: {
            quoteColor: "#222222",
            backgroundColor: "#40CB76",
            thirdElementColor: "#5DD38B",
            primaryTextColor: "#FFFCF5",
            secondaryTextColor: "#29382F",
            logoColor: "#FF3508"
        },
        pink: {
            quoteColor: "#3D4393",
            backgroundColor: "#E5C0D1",
            thirdElementColor: "#E9C9D8",
            primaryTextColor: "#3D4393",
            secondaryTextColor: "#29382F",
            logoColor: "#FF3508"
        },
    }

    let showTheme: Theme = themes[theme];
    showText = text == "" ? `${firstName} vil gerne give dig muligheden for at prøve Zetland i en måned – uden binding. Og prisen? Den bestemmer du selv.` : text
    length = showText.length;
    const x = length;
    const x1 = 10.0;
    const y1 = 18.0
    const a = -0.107;
    const b = y1 - (a*x1);
    textSize = x < x1 ? y1 : Math.max((a*x) + b, 8.4);
    const lineHeight: number = 0 + textSize * 1.3;
    textClasses = "w-full font-semibold"
    if(length <= 20) { textClasses += " text-center" ;}
    // else if(length <= 39) { textSize = "text-5xl text-center font-bold pl-14" ;}
    // else if(length <= 70) { textSize = "text-4xl font-semibold pl-16" ;}
    // else { textSize = "pl-16 text-3xl font-semibold"; }



    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <style>
        @import 'https://zetlanddk.github.io/fonts/sharp/index.css';
        html {
            orientation: portrait;
            font-family: 'SharpGrotesk18','Gotham SSm A','Gotham SSm B',Arial,Verdana,sans-serif;
            margin: 0;
            font-size: 30px;
        }
        body {
            padding: 0;
            margin: 0;
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
    <body style="background-color: ${showTheme.backgroundColor}">
        ${ debug ? `<span class="fixed z-40">${length} ${textSize}vh</span>` : ''}
        <svg style="color: ${showTheme.thirdElementColor};width: 106vw; height: 106vh;margin-left:-3vw;margin-top:-3vw" class="z-10 fixed" width="727" height="409" preserveAspectRatio="none" viewBox="0 0 727 409" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M480.544 334.049L443.688 282.704L377.872 255.057H321.271L262.037 301.136L225.181 365.646L221.232 394.61C220.604 399.187 220.451 404.04 220.604 409H489.514L491.075 395.926L480.544 334.049Z" fill="currentColor"/>
            <path d="M727 396.753V217.505L710.791 202.671L695.684 197.236L678.159 193.608L666.067 197.236L661.23 217.183L678.465 268.574L695.699 294.568V315.725L665.47 336.881L615.894 354.409L586.277 359.247L578.426 366.503V379.194L592.323 407.01L595.078 408.954H714.771C721.536 408.954 727.015 403.474 727.015 396.707L727 396.753Z" fill="currentColor"/>
            <path d="M111.565 195.675L144.197 90.0146L77.3254 0H12.2447C5.47951 0 0 5.48048 0 12.2469V396.753C0 403.52 5.47951 409 12.2447 409H95.0344L178.911 398.131L111.565 195.675Z" fill="currentColor"/>
            <path d="M301.22 110.268L400.693 29.117L458.534 80.2171L424.555 165.792L704.699 103.333L586.997 0H199.451L189.166 71.3228L301.22 110.268Z" fill="currentColor"/>
        </svg>

        <div style="color: ${showTheme.primaryTextColor};padding:7vh;" class="h-screen w-screen flex flex-col items-start justify-between fixed z-20">
            <div style="height: 18vh; width: 18vh" class="">
                <svg class="" viewBox="0 0 83 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.3164 35.4016L3.35013 31.0414L2.03659 29.6057L0 18.1144L2.76566 8.82088L5.39877 5.66593L13.3403 3.88758L21.4806 2.65869L27.4698 5.24055L30.4645 6.55215L35.5258 11.3023L38.5024 16.4542L39.0326 23.0654L37.4961 34.2554L31.4767 49.7288L27.1806 54.9753L21.0407 62L19.1367 54.2604L22.9387 43.7971L23.234 39.0646L22.4989 34.4799L19.1367 34.3381L14.3164 35.4016Z" fill="currentColor"/>
                    <path d="M55.3554 32.8611L47.3115 29.2394L45.9979 27.8096L42.6357 16.7732L46.727 7.02478L49.3601 3.86983L57.8378 0L65.4419 0.862588L71.4372 3.43854L74.01 5.19325L78.7641 10.1206L82.4697 14.6581L82.9999 21.2693L81.4092 29.0503L77.312 42.0128L71.1419 53.1792L65.0021 60.2039L63.1041 52.4643L66.9001 42.001L67.1953 37.2685L66.4662 32.6838L63.1041 32.5361L55.3554 32.8611Z" fill="currentColor"/>
                </svg>
            </div>
            <div style="font-family: SharpGrotesk20;font-size:${textSize}vh;line-height:${lineHeight}vh;margin-top:-5vh;" class="${textClasses} ">
                <div class="">
                    ${emojify(
                        marked(showText)
                    )}
                </div>
            </div>
            <div class="flex justify-between w-full items-end">
                <div class="" style="color: ${showTheme.secondaryTextColor};">
                    <div class="flex justify-start items-center">
                        ${ getImage(image) }
                        <p style="font-size: 4.9vh; line-height: 6vh" class="pl-3 tracking-wide leading-none mb-1">
                            <span class="">${ name }${ debug ? `${length} ${textSize}` : ''}</span><br />
                            <span class="">Medlem af Zetland</span>
                        </p>
                    </div>
                </div>
                <div class="" style="width: 32vh;">
                    <svg class="" style="color: ${showTheme.logoColor};" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                        <path d="M0 23.562V19.6198L9.3508 6.16451H0.560536V1.1582H16.0831V5.47617L7.23082 18.4617H16.1452V23.562H0Z" fill="currentColor"/>
                        <path d="M25.9973 24C23.0676 24 20.9062 23.2385 19.5142 21.7154C18.1223 20.1933 17.4258 18.1066 17.4258 15.457V13.7985C17.4258 11.9837 17.7844 10.425 18.5015 9.12053C19.2187 7.81703 20.2206 6.81616 21.5091 6.11694C22.7977 5.41772 24.3148 5.0686 26.0594 5.0686C28.0543 5.0686 29.6748 5.45431 30.922 6.22672C32.1692 6.99913 33.0824 8.02571 33.6646 9.30844C34.2458 10.5912 34.5374 12.0044 34.5374 13.5483V16.0514H22.6627C22.8292 18.4923 23.9818 19.7127 26.1225 19.7127C26.9115 19.7127 27.5194 19.5406 27.9459 19.1964C28.3715 18.8523 28.668 18.3884 28.8345 17.8039V17.71H34.4133V17.8039C34.0182 19.6613 33.1612 21.1576 31.8421 22.294C30.522 23.4313 28.5744 23.999 25.9983 23.999L25.9973 24ZM26.1225 9.19965C24.0655 9.19965 22.9228 10.3469 22.6942 12.6414H29.333C29.2709 11.5357 28.9852 10.6861 28.4759 10.0907C27.9666 9.49635 27.1825 9.19866 26.1225 9.19866V9.19965Z" fill="currentColor"/>
                        <path d="M38.1716 16.3648V10.2321H35.3354V5.7262C35.6674 5.7262 35.964 5.70543 36.224 5.66389C36.4831 5.62236 36.759 5.56005 37.0496 5.47599C37.5687 5.39291 37.9431 5.205 38.1716 4.91226C38.4002 4.6205 38.5657 4.14084 38.6701 3.47327C38.7322 3.1192 38.7794 2.7335 38.81 2.31515C38.8415 1.89779 38.8671 1.49131 38.8878 1.09473H43.2204V5.41269H47.2101V10.2311H43.2204V15.2997C43.2204 16.2808 43.2933 16.9998 43.4381 17.4587C43.5829 17.9176 43.8696 18.2153 44.2952 18.3508C44.7207 18.4862 45.3394 18.5545 46.1492 18.5545H47.2092V23.5608H44.5907C42.8864 23.5608 41.5723 23.3373 40.6482 22.8883C39.7232 22.4403 39.0789 21.6886 38.7154 20.6353C38.3519 19.5821 38.1697 18.1589 38.1697 16.3639L38.1716 16.3648Z" fill="currentColor"/>
                        <path d="M49.3044 0H54.697V23.5619H49.3044V0Z" fill="currentColor"/>
                        <path d="M61.9988 24C60.1291 24 58.747 23.5728 57.8534 22.7173C56.9599 21.8618 56.5137 20.6938 56.5137 19.2123V18.9937C56.5137 17.9513 56.7058 17.0849 57.09 16.3966C57.4742 15.7082 58.0091 15.1346 58.6947 14.6757C59.1311 14.384 59.5833 14.1496 60.0503 13.9716C60.5182 13.7945 61.0679 13.6383 61.7023 13.5018C62.3358 13.3663 63.1101 13.2041 64.0243 13.0162C65.3128 12.7868 66.2369 12.5524 66.7984 12.312C67.3599 12.0727 67.6397 11.6603 67.6397 11.0758V10.9818C67.6397 10.4399 67.4633 10.0116 67.1097 9.6991C66.756 9.38658 66.1324 9.22933 65.2399 9.22933C63.4115 9.22933 62.4766 10.064 62.4343 11.7325V12.1083H57.0427V11.7018C57.1461 9.71987 57.8731 8.11868 59.2247 6.89826C60.5753 5.67784 62.5702 5.06763 65.2094 5.06763C67.0584 5.06763 68.544 5.33861 69.6661 5.88157C70.7881 6.42453 71.5989 7.191 72.0974 8.18198C72.5958 9.17296 72.8451 10.3459 72.8451 11.7018V23.5609H68.482L67.8584 20.7136C67.3806 21.6729 66.6683 22.4611 65.7236 23.0763C64.7779 23.6914 63.5366 23.999 61.9988 23.999V24ZM64.1809 20.0579C64.8872 20.0579 65.4951 19.8907 66.0044 19.5574C66.5137 19.2241 66.9127 18.7959 67.2042 18.2747C67.4949 17.7535 67.6407 17.1898 67.6407 16.5845V15.0199C67.4121 15.2078 67.1107 15.3641 66.7373 15.4897C66.3639 15.6153 65.9157 15.73 65.3975 15.8339C64.6695 15.9802 64.1297 16.1157 63.777 16.2403C63.4233 16.3659 63.1229 16.5222 62.8736 16.7101C62.3959 17.0652 62.1565 17.5864 62.1565 18.2747V18.431C62.1565 19.5159 62.8313 20.0579 64.1829 20.0579H64.1809Z" fill="currentColor"/>
                        <path d="M75.301 23.5619V5.41277H79.8513L80.3498 8.35405C80.7862 7.35319 81.4403 6.55507 82.3131 5.96068C83.186 5.36629 84.2765 5.0686 85.5857 5.0686C87.4969 5.0686 88.9361 5.6531 89.9025 6.82111C90.8689 7.98911 91.3517 9.62689 91.3517 11.7335V23.5619H85.9601V13.1734C85.9601 12.1093 85.7936 11.2647 85.4616 10.6386C85.1286 10.0126 84.4745 9.70008 83.4983 9.70008C82.522 9.70008 81.7891 10.0492 81.3635 10.7484C80.9369 11.4476 80.7241 12.402 80.7241 13.6116V23.5619H75.301Z" fill="currentColor"/>
                        <path d="M99.8394 23.8744C97.7825 23.8744 96.1669 23.1346 94.9926 21.6531C93.8183 20.1726 93.2312 17.9503 93.2312 14.9883V13.5493C93.2312 11.6089 93.5169 10.0185 94.0883 8.77735C94.6596 7.53616 95.4438 6.61343 96.4417 6.00816C97.4387 5.40289 98.5814 5.10026 99.87 5.10026C101.159 5.10026 102.114 5.34553 102.925 5.83607C103.736 6.32662 104.348 7.0199 104.764 7.91692V0H110V23.5619H105.48L104.95 20.5266C104.555 21.5493 103.938 22.3622 103.095 22.9675C102.254 23.5728 101.167 23.8754 99.8384 23.8754L99.8394 23.8744ZM101.616 19.3062C102.592 19.3062 103.371 18.9522 103.953 18.2421C104.535 17.5329 104.826 16.4688 104.826 15.0506V13.6422C104.826 12.3486 104.545 11.3418 103.985 10.6228C103.423 9.90283 102.665 9.54383 101.709 9.54383C100.754 9.54383 99.9429 9.888 99.403 10.5763C98.8622 11.2647 98.5922 12.2764 98.5922 13.6116V14.9883C98.5922 16.5321 98.8671 17.6378 99.4178 18.3054C99.9685 18.9729 100.7 19.3062 101.616 19.3062Z" fill="currentColor"/>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </body>
</html>`;
}

function getImage(src: string) {
    return `<img
        style="height: 16vh;"
        class="rounded-full bg-gray-300"
        src="${sanitizeHtml(src)}"
    />`
}
