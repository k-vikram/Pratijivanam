import React from 'react';
// import logo from './logo.svg';
import logo from './Assets/nh_logo.gif';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';


function App() {
  return (
    <Container>
      <Row>
        <Col sm={12}>
          <header>
            <Nav
              variant="tabs"
              defaultActiveKey="/home"
            >
              <Nav.Link eventKey="logo">
                <img src={logo} className="App-logo" alt="logo" />
              </Nav.Link>
              <Nav.Link eventKey="home">Home</Nav.Link>
              <Nav.Link eventKey="new">New</Nav.Link>
              <Nav.Link eventKey="comments">Comments</Nav.Link>
              <Nav.Link eventKey="ask">Ask</Nav.Link>
            </Nav>
          </header>
        </Col>
      </Row>

      <Row className="justify-content-md-center">

      </Row>
    </Container>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
