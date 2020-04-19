import React, { Component } from 'react';
import { Menu } from 'antd';
import menuConfig from '../../config/menuConfig';
import { NavLink } from 'react-router-dom';
import './index.less';
import '../../style/common.less';

const { SubMenu } = Menu;

class NavLeft extends Component {

  componentWillMount() {
    const menuTree = this.renderMenu(menuConfig);
    this.setState({menuTree});
  }

  renderMenu = (data) => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            { this.renderMenu(item.children) }
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    });
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Imooc MS</h1>
        </div>
        <Menu theme="dark">
          {this.state.menuTree}
        </Menu>
      </div>
    );
  }
}

export default NavLeft;