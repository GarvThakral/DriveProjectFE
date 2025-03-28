export interface fileResponse{
    Key: string,
    LastModified: string,
    ETag: string,
    ChecksumAlgorithm: [ string ],
    ChecksumType: string,
    Size: Number,
    StorageClass: string,
    Owner: {
        DisplayName: string,
        ID: string
    }

}