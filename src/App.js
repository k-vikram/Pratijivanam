import React from 'react';

import './App.scss';
import Container from 'react-bootstrap/Container';

import Header from './Modules/Layout/Views/Header';
import Content from './Modules/Layout/Views/Content';

function App() {
  return (
    <Container>
      <Header />
      <Content />
    </Container>
  );
}

export default App;
