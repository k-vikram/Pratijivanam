import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import './App.scss';
import Container from 'react-bootstrap/Container';

import Header from './Modules/Layout/Views/Header';
import Content from './Modules/Layout/Views/Content';
import Footer from './Modules/Layout/Views/Footer';

export const AppWideContext = React.createContext();

export const initialState = {
  allTopStories: [],
  allNewStories: [],
  allComments: []
};

export const FETCH_ALL_STORIES = 'FETCH_ALL_STORIES';
export const FETCH_NEW_STORIES = 'FETCH_NEW_STORIES';
export const FETCH_ALL_COMMENTS = 'FETCH_ALL_COMMENTS';

export const Story = (state, action) => {
  switch (action.type) {
    case FETCH_ALL_STORIES:
    case FETCH_NEW_STORIES:
    case FETCH_ALL_COMMENTS:
      return { ...state, ...action.data }
    default:
      return state;
  }
}

const AppWideContextProvider = ({
  children
}) => {
  const [globalState, dispatch] = useReducer(Story, initialState);

  return <AppWideContext.Provider value={{ globalState, dispatch }}>
    {children}
  </AppWideContext.Provider>
}

AppWideContextProvider.propTypes = {
  children: PropTypes.any
}

function App() {
  return (
    <AppWideContextProvider>
      <Container>
        <Header />
        <Content />
        <Footer />
      </Container>
    </AppWideContextProvider>
  );
}

export default App;
