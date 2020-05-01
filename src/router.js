import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './Admin'
import Buttons from './pages/ui/button';
import NoMatch from './pages/nomatch';
import Modals from './pages/ui/modals';
import Loading from './pages/ui/loading';
import Message from './pages/ui/message';
import Notice from './pages/ui/notice';
import Butto from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';
import Carousel from './pages/ui/carousel';
import FormLogin from './pages/form/login';
import Register from './pages/form/register';
import Basic from './pages/table/basic';
import HighBasic from './pages/table/highBasic';
import City from './pages/city';
import Order from './pages/order';
import Common from './Common';
import OrderDetail from './pages/order/Detail';
import User from './pages/user';
import BikeMap from './pages/map/bikeMap';
import Bar from './pages/echarts/bar';
import Pie from './pages/echarts/pie';
import Line from './pages/echarts/line';
import Rich from './pages/rich';
import Permission from './pages/permission';
import Home from './pages/home';

class IRouter extends Component {
  render() {
    return (
      <Router>
          <App>
            <Switch>
              <Route path='/login' component={Login}></Route>
              <Route path='/common' render={() => {
                return (
                  <Common>
                    <Switch>
                      <Route path='/common/order/detail/:orderId' component={OrderDetail}></Route>
                    </Switch>
                  </Common>
                )
              } }>
              </Route>
              <Route path='/' render={() => {
                return (
                  <Admin>
                    <Switch>
                      <Route path='/home' component={Home}></Route>
                      <Route path='/ui/buttons' component={Buttons}></Route>
                      <Route path='/ui/modals' component={Modals}></Route>
                      <Route path='/ui/loadings' component={Loading}></Route>
                      <Route path='/ui/messages' component={Message}></Route>
                      <Route path='/ui/notification' component={Notice}></Route>
                      <Route path='/ui/tabs' component={Butto}></Route>
                      <Route path='/ui/gallery' component={Gallery}></Route>
                      <Route path='/ui/carousel' component={Carousel}></Route>
                      <Route path='/form/login' component={FormLogin}></Route>
                      <Route path='/form/reg' component={Register}></Route>
                      <Route path='/table/basic' component={Basic}></Route>
                      <Route path='/table/high' component={HighBasic}></Route>
                      <Route path='/city' component={City}></Route>
                      <Route path='/order' component={Order}></Route>
                      <Route path='/user' component={User}></Route>
                      <Route path='/bikeMap' component={BikeMap}></Route>
                      <Route path='/charts/bar' component={Bar}></Route>
                      <Route path='/charts/pie' component={Pie}></Route>
                      <Route path='/charts/line' component={Line}></Route>
                      <Route path='/rich' component={Rich}></Route>
                      <Route path='/permission' component={Permission}></Route>
                      <Redirect to="/home" />
                      <Route component={NoMatch}></Route>
                    </Switch>
                  </Admin>
                )
              }}></Route>
            </Switch>
          </App>
      </Router>
    );
  }
}

export default IRouter;