
export const CallStoriesAPI = async (resourceType = 'topstories') => {
    const rawResponse = await fetch(`https://hacker-news.firebaseio.com/v0/${resourceType}.json?print=pretty`);
    const finalList = await rawResponse.json();
    return finalList;
}

export const CallStoryAPI = async (resourceId = 0) => {
    if (resourceId) {
        const rawResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${resourceId}.json?print=pretty`);
        const finalList = await rawResponse.json();
        return finalList;
    } else {
        return [];
    }
}