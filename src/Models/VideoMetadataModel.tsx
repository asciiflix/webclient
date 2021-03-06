import CommentModel from "./CommentModel"

export default interface VideoMetaDataModel {
    UUID: string
    Title: string
    Description: string
    UploadDate: string
    Views: number
    Likes: number
    UserID: number
    Creator: string
}