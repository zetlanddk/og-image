export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    image: string;
    name: string;
    firstName: string;
    theme: string;
}

export interface Theme {
    quoteColor: string;
    backgroundColor: string;
    thirdElementColor: string;
    primaryTextColor: string;
    secondaryTextColor: string;
    logoColor: string;
}
