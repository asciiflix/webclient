export default function shortCreatorName(creatorName: string) {
    if (creatorName.length > 10){
        creatorName = creatorName.slice(0, 10) + "..."
    } 
    return creatorName;
}