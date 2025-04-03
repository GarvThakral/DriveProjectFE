export interface CardProps {
    id?: Number;
    fileName?: string;
    fileSize?: Number;
    creationDate?: string;
    starred?: Boolean;
    previewLink?: string;
    status:"ACTIVE"|"TRASH"
}
