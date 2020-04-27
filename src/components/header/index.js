import React, { Component } from 'react';
import { Row, Col } from 'antd';
import utils from '../../utils/utils';
import axios from 'axios';

import './index.less';

class Header extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      userName: "河畔一角",
      sysTime: "",
      wind: "",
      weather: ""
    }
  }
  render() {
    let { menuType } = this.props;
    return (
      <div className="header">
        <Row className="header-top">
          {
            menuType ? 
              <Col span={6} className="logo">
                <img src="/assets/logo-ant.svg" alt=""/>
                <span>IMooc通用管理系统</span>
              </Col>
              : ""
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎: {this.state.userName}</span>
            <a href="">退出</a>
          </Col>
        </Row>
        {
          menuType ? "" : 
          <Row className="breadcrumb">
            <Col span={4} className="breadcrumb-title">
              首页
            </Col>
            <Col span={20} className="weather">
              <span className="date">{this.state.sysTime}</span>
              <span className="weather-details">
                <span className="weather-detail">{this.state.weather}</span>
                <span className="weather-wind">{this.state.wind}</span>
              </span>
            </Col>
          </Row>
        }
      </div>
    );
  }

  componentDidMount() {
    const time = new Date().getTime();
    const sysTime = utils.formateDate(time);
    this.setState(() => ({sysTime}));
    setInterval(() => {
      const time = new Date().getTime();
      const sysTime = utils.formateDate(time);
      this.setState(() => ({sysTime}));
    }, 1000);
    this.getWeatherAPIData();
  }

  getWeatherAPIData() {
    axios.get('/api/weather.json')
    .then(res => {
      if (res.data.message === "success") {
        this.setState(() => ({
          weather: res.data.result.now.text,
          wind: res.data.result.now.wind_dir
        }));
      }
    })
  }
}

export default Header;