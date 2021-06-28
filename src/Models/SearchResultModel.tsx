import UserMetaDataModel from "./UserMetaDataModel";
import VideoMetaDataModel from "./VideoMetadataModel";

export default interface SearchResultModel {
    Users: UserMetaDataModel[]
    Videos: VideoMetaDataModel[]
}