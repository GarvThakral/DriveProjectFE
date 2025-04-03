export interface fileResponse {
    id: number,
    fileName: string,
    fileSize: number,
    fileType: string,
    lastUpdated: string, 
    starred: boolean,
    previewUrl: string,
    storagePath: string,
    createdAt: string,
    folderId: number,
    status:"ACTIVE" | "TRASH"
}
export interface FolderProps{
    id:number,
    folderName:string,
    folderSize:number,
    parentId:number,
    createdAt: string,
    userId:number
}
