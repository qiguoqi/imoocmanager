import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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

class IRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <App>
            <Route path='/login' component={Login}></Route>
            <Route path='/admin' render={() => {
              return (
                <Admin>
                  <Switch>
                    <Route path='/admin/ui/buttons' component={Buttons}></Route>
                    <Route path='/admin/ui/modals' component={Modals}></Route>
                    <Route path='/admin/ui/loadings' component={Loading}></Route>
                    <Route path='/admin/ui/messages' component={Message}></Route>
                    <Route path='/admin/ui/notification' component={Notice}></Route>
                    <Route path='/admin/ui/tabs' component={Butto}></Route>
                    <Route path='/admin/ui/gallery' component={Gallery}></Route>
                    <Route path='/admin/ui/carousel' component={Carousel}></Route>
                    <Route path='/admin/form/login' component={FormLogin}></Route>
                    <Route path='/admin/form/reg' component={Register}></Route>
                    <Route path='/admin/table/basic' component={Basic}></Route>
                    <Route path='/admin/table/high' component={HighBasic}></Route>
                    <Route path='/admin/city' component={City}></Route>
                    <Route path='/admin/order' component={Order}></Route>
                    <Route component={NoMatch}></Route>
                  </Switch>
                </Admin>
              )
            }}></Route>
            <Route path='/common' render={() => {
              return (
                <Common>
                  <Switch>
                    <Route path='/common/order/detail/:orderId' component={Login}></Route>
                  </Switch>
                </Common>
              )
            } }>

            </Route>
          </App>
        </Switch>
        
      </Router>
    );
  }
}

export default IRouter;