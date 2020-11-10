import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { AppWideContext, FETCH_ALL_STORIES } from "../../../App";
import Story from '../../Layout/Views/Story';

const RESULTS_PER_PAGE = 30;

const Home = (
) => {
    const location = useLocation();
    const { globalState, dispatch } = useContext(AppWideContext);
    const { allTopStories } = globalState;
    const [callList, changeCallList] = useState([]);

    const queryString = location?.search;
    const pageNo = queryString ? (queryString.slice(1).indexOf('p=') > -1 ?
        parseInt(queryString.slice(1).split('=').pop(), 10)  : 1) : 1;

    const paginationObj = {
        startIndex: (pageNo - 1) * RESULTS_PER_PAGE,
        endIndex: pageNo * RESULTS_PER_PAGE,
        nextPage: pageNo + 1
    };

    /* eslint-disable */

    // make API call to fetch all top stories
    useEffect(() => {
        if (allTopStories.length === 0) {
            callStoriesAPI('topstories')
                .then(allStories => {
                    dispatch({
                        type: FETCH_ALL_STORIES,
                        data: {
                            allTopStories: allStories
                        }
                    });
                    const activeCallList = allStories.slice(paginationObj.startIndex, paginationObj.endIndex)
                    changeCallList(activeCallList);
                })
                .catch((ex) => {
                    dispatch({
                        type: FETCH_ALL_STORIES,
                        data: {
                            allTopStories: [],
                            fetchAllStoriesError: ex
                        }
                    })
                    changeCallList([]);
                });
        } else {
            changeCallList(allTopStories.slice(paginationObj.startIndex, paginationObj.endIndex));
        }
    }, []);

    useEffect(() => {
        const activeCallList = allTopStories.slice(paginationObj.startIndex, paginationObj.endIndex)
        changeCallList(activeCallList);
    }, [pageNo, allTopStories])

    /* eslint-enable */

    return (
        <Row>
            {callList.length > 0 ? <Col role="Content" name="Content">
                <Col sm={12}>
                    {
                        callList.map((eachStoryId, sIndex) => <Story
                            key={eachStoryId}
                            storyId={eachStoryId}
                            serialNo={(sIndex + 1) + ((pageNo - 1) * RESULTS_PER_PAGE)}
                        />)
                    }
                </Col>
                {allTopStories.length > RESULTS_PER_PAGE && <Col xs={{ span: 12 }}>
                    <br />
                    <div className='Custom-Grid'>
                        <div className='text-grey Serial_No_Box End_Align' style={{ 'visibility': 'hidden' }}>
                            00.
                        </div>
                        <div>
                            <div>
                                <Link to={`/home?p=${paginationObj.nextPage}`}>
                                    <div className='text-grey'>
                                        More...&nbsp;
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Col>}
            </Col>
                : pageNo < 1 ? <Redirect to={'/home'} /> :
                <Col xs={12}>
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