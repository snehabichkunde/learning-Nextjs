export interface UnslashImage {
    id: string;
    "description": string,
    "urls": {
        "raw": string,
        "regular": string,
    },
    "user": {
        "username": string,
    },
    "width": number,
    "height": number,
    alt_description?: string | null;

}