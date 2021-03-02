import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Col from 'react-bootstrap/Col';

import { CallStoryAPI } from '../../../utils/ApiCalls';
import { EvaluateDomainName } from '../../../utils/HelperUtils';

dayjs.extend(relativeTime)

const calcRelTime = (dateTime) => {
    if (!dateTime) {
        return
    }
    return dayjs.unix(dateTime).fromNow();
}

const StoryCard = ({
    storyId,
    serialNo
}) => {
    const [storyObj, changeStoryObj] = useState();

    // make API call to fetch all current story

    /* eslint-disable */
    useEffect(() => {
        if (!storyObj) {
            CallStoryAPI(storyId)
                .then(storyObj => {
                    changeStoryObj(storyObj)
                })
                .catch(error => changeStoryObj({ id: storyObj, error: 'error fetching story' }))
        }
    }, []);
    /* eslint-enable */

    const DomainName = EvaluateDomainName(storyObj?.url);

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
                        </a>&nbsp;
                        {DomainName && <small className='text-grey'>({DomainName})</small>}
                    </div>
                    <small className='text-grey'>
                        {storyObj.score} points | by: {storyObj.by} | {calcRelTime(storyObj.time)} | {storyObj.kids?.length} comments
                    </small>
                </div>
            </div>
        }
    </Col >)
}

StoryCard.propTypes = {
    storyId: PropTypes.number.isRequired,
    serialNo: PropTypes.number.isRequired
}

export default React.memo(StoryCard);