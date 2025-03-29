export interface fileResponse {
    files: {
      id: number,
      fileName: string,
      fileSize: number,
      fileType: string,
      lastUpdated: string, 
      starred: boolean,
      previewUrl: string,
      storagePath: string,
      createdAt: string,
      folderId: number
    }[],
    folders?: {}[]
  }
  