import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Story from '../../Layout/Views/Story';

const Home = (
) => {

    const [topStoriesList, changeTopStoriesList] = useState([]);
    const [callList, changeCallList] = useState([]);

    // make API call to fetch all top stories

    /* eslint-disable */
    useEffect(() => {
        if (topStoriesList?.length === 0) {
            callStoriesAPI('topstories')
                .then(allStories => {
                    changeTopStoriesList(allStories);
                    changeCallList(allStories.slice(0, 30));
                })
                .catch(() => {
                    changeCallList([]);
                });
        }
    }, []);
    /* eslint-enable */

    return (
        <Row>
            {callList.length > 0 ?
                callList.map((eachStoryId,sIndex) => <Story 
                key={eachStoryId} 
                storyId={eachStoryId} 
                serialNo={sIndex+1}
                />)
                :
                <Col xs={12}>
                    <h4>Loading Stories ....</h4>
                </Col>
            }
        </Row>)
}

export const callStoriesAPI = async (resourceType = 'topstories') => {
    const rawResponse = await fetch(`https://hacker-news.firebaseio.com/v0/${resourceType}.json?print=pretty`);
    const finalList = await rawResponse.json();
    return finalList;
}

export default React.memo(Home);