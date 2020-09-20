import React from 'react';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';

import Home from './Home';
import New from './New';
import Comments from './Comments';
import Ask from './Ask';

const Content = () => {
    return (
        <Switch>
            <Route exact path={"/home"} component={Home} ></Route>
            <Route path={"/new"} component={New} ></Route>
            <Route path={"/comments"} component={Comments} ></Route>
            <Route path={"/ask"} component={Ask} ></Route>
        </Switch>
    )
}

export default React.memo(Content)