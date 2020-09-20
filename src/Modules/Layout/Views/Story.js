import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Col from 'react-bootstrap/Col';

dayjs.extend(relativeTime)

const calcRelTime = (dateTime) => {
    if (!dateTime) {
        return
    }
    return dayjs.unix(dateTime).fromNow();
}

const StoryCard = React.memo(({
    storyId,
    serialNo
}) => {
    const [storyObj, changeStoryObj] = useState();

    // make API call to fetch all current storiy

    /* eslint-disable */
    useEffect(() => {
        if (!storyObj) {
            callStoryAPI(storyId)
                .then(storyObj => {
                    changeStoryObj(storyObj)
                })
                .catch(error => changeStoryObj({ id: storyObj, error: 'error fetching story' }))
        }
    }, []);
    /* eslint-enable */

    return (<Col xs={12} >
        {!storyObj ? <span>Loading Story {storyId} ....</span> :
            <div className='Custom-Grid'>
                <div className='text-grey Serial_No_Box End_Align'>
                    {serialNo}.
                </div>
                <div>
                    <div>
                        <a
                            href={storyObj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="Story-Title">
                            {storyObj.title}
                        </a>&nbsp;&nbsp;
                        <small className='text-grey'>(by: {storyObj.by})</small>
                    </div>
                    <small className='text-grey'>
                        {storyObj.score}&nbsp;&nbsp;&nbsp;&nbsp;{calcRelTime(storyObj.time)}
                    </small>
                </div>
            </div>
        }
    </Col >)
})

export const callStoryAPI = async (resourceId = 0) => {
    if (resourceId) {
        const rawResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${resourceId}.json?print=pretty`);
        const finalList = await rawResponse.json();
        return finalList;
    } else {
        return [];
    }

}


export default StoryCard;