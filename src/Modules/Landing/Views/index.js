import React from 'react';
import {Switch, Route}  from 'react-router-dom';

import Home from './Home';
import New from './New';
import Comments from './Comments';
import Ask from './Ask';

const Content = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={Home} />
            <Route path={"/home"} component={Home} />
            <Route path={"/new"} component={New} />
            <Route path={"/comments"} component={Comments} />
            <Route path={"/ask"} component={Ask} />
        </Switch>
    )
}

export default React.memo(Content)