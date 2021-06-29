import VideoMetaDataModel from "./VideoMetadataModel";

export default interface UserMetaDataModel {
    UserID: string
    Name: string
    Description: string
    Picture_ID: string
    Videos: VideoMetaDataModel[]
}
