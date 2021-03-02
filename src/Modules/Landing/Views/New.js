import React, {useContext, useState, useEffect} from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { CallStoriesAPI } from '../../../utils/ApiCalls';
import { RESULTS_PER_PAGE } from '../../../utils/Constants';
import { AppWideContext, FETCH_ALL_STORIES } from "../../../App";
import Story from '../../Layout/Views/Story';

const New = () => {
    const location = useLocation();
    const { globalState, dispatch } = useContext(AppWideContext);
    const { allNewStories } = globalState;
    const [ callList, changeCallList ] = useState([]);

    const queryString = location?.search;

    //custom pagination logic
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
        if (allNewStories.length === 0) {
            CallStoriesAPI('newstories')
                .then(newStories => {
                    dispatch({
                        type: FETCH_ALL_STORIES,
                        data: {
                            allNewStories: newStories
                        }
                    });
                    const activeCallList = newStories.slice(paginationObj.startIndex, paginationObj.endIndex)
                    changeCallList(activeCallList);
                })
                .catch((ex) => {
                    dispatch({
                        type: FETCH_ALL_STORIES,
                        data: {
                            allNewStories: [],
                            fetchAllStoriesError: ex
                        }
                    })
                    changeCallList([]);
                });
        } else {
            changeCallList(allNewStories.slice(paginationObj.startIndex, paginationObj.endIndex));
        }
    }, []);

    useEffect(() => {
        const activeCallList = allNewStories.slice(paginationObj.startIndex, paginationObj.endIndex)
        changeCallList(activeCallList);
    }, [pageNo, allNewStories])

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
                {allNewStories.length > RESULTS_PER_PAGE && <Col xs={{ span: 12 }}>
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

export default React.memo(New)