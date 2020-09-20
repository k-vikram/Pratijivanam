import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../Assets/nh_logo.gif';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
    return (<Row>
        <Col xs={12}>
            <header>
                <Nav
                    className='Header'
                    variant="pills"
                    defaultActiveKey="/home"
                >
                    <Nav.Item>
                        <Link to={"/home"}>
                            <Nav.Link as="div" eventKey="home">
                                <img src={logo} className="App-logo" alt="logo" />
                            &nbsp;&nbsp;<strong>Hacker News</strong>
                            </Nav.Link>
                        </Link>
                    </Nav.Item>
                    <Link to={"/new"} >
                        <Nav.Link as="div" eventKey="new">
                            New
                    </Nav.Link>
                    </Link>
                    <Link to={"/comments"}>
                        <Nav.Link as="div" eventKey="comments">
                            Comments
                    </Nav.Link>
                    </Link>
                    <Link to={"/ask"}>
                        <Nav.Link as="div" eventKey="ask">
                            Ask
                        </Nav.Link>
                    </Link>
                </Nav>
            </header>
        </Col>
    </Row>)
}

export default React.memo(Header)