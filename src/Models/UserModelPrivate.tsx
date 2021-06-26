import VideoMetaDataModel from "./VideoMetadataModel"

export default interface UserModelPrivate {
    UserID?: number,
    Name?: string,
    Email?: string,
    Description?: string,
    Picture_ID?: string,
    Videos?: VideoMetaDataModel[],
    Comments?: null,
    Likes?: null
}