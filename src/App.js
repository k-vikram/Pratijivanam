import React, { useReducer } from 'react';

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

export const Story = (state, action) => {
  switch (action.type) {
    case FETCH_ALL_STORIES:
      return { ...state, ...action.data }
    default:
      return state;
  }
}

function App() {
  const [globalState, dispatch] = useReducer(Story, initialState);

  return (
    <AppWideContext.Provider value={{ globalState, dispatch }}>
      <Container>
        <Header />
        <Content />
        <Footer />
      </Container>
    </AppWideContext.Provider>
  );
}

export default App;
