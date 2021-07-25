export default function shortCreatorName(creatorName: string, length: number) {
    if (creatorName.length > length){
        creatorName = creatorName.slice(0, length) + "..."
    } 
    return creatorName;
}