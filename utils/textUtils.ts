export function truncateText(text: string, length: number){
    if (text.length > length){
        return text.substring(0, length) + '...';
    } 
    return text;
}

export function formatTitleToId(title: string){
    return title.replace(/ /g, '-').toLowerCase();
}