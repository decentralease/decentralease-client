export const getLink = (link: string) => {
    if(!link) return '';
    if(link.startsWith('ipfs')) {
        return `https://ipfs.io/ipfs/${link.slice(link.indexOf('/') + 1)}`;
    }
    return link;
}