export type FileType = 'png' | 'jpeg';

export interface ParsedRequest {
    fileType: FileType;
    text: string;
    image: string;
    name: string;
}
