import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Header from './components/header';
import Footer from './components/footer';
import NavLeft from './components/navLeft';
import Home from './pages/home';
import './style/common.less';

class Admin extends Component {
  render() {
    return (
      <div>
        <Row className="container">
          <Col span={3} className="nav-left">
            <NavLeft></NavLeft>
          </Col>
          <Col span={21} className="main">
            <Header></Header>
            <Row className="content">
              {this.props.children ? this.props.children: <Home />}
            </Row>
            <Footer></Footer>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;