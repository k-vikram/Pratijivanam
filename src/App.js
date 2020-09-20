import React from 'react';

import './App.scss';
import Container from 'react-bootstrap/Container';

import Header from './Modules/Layout/Views/Header';
import Content from './Modules/Layout/Views/Content';
import Footer from './Modules/Layout/Views/Footer';

function App() {
  return (
    <Container>
      <Header />
      <Content />
      <Footer />
    </Container>
  );
}

export default App;
