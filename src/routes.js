/*eslint-disable*/
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Router } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import { Layout, Row, Col, Breadcrumb } from 'antd';
import { Provider } from 'mobx-react';
import  createStores  from './stores';
const { Header, Content, Footer, Sider } = Layout; 

import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';
//import Notfound from './pages/Notfound';
import Menus from './pages/Menus';
import logo from './logo.png';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

const routes = [{
  path: '/',
  breadcrumbName: '首页'
}, {
  path: 'list',
  breadcrumbName: '列表'
}, {
  path: 'detail',
  breadcrumbName: '详情'
}];

function itemRender(route, params, routes, paths){
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
}
const stores = createStores();
const history = syncHistoryWithStore(browserHistory, routingStore)
const Routes=()=>(
  <Provider {...stores}>
    <Router history = {history}>
      <div>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%', backgroundColor:'rgb(55,61,65)' }}>
            <Row style={{height:'64px'}}>
              <Col span={1} style={{height:'100%',padding:'3px 0'}}><img style={{display:'block',width:'100%',height:'100%'}} src={logo}/></Col>
              <Col span={22} style={{height:'100%'}}></Col>
            </Row>
          </Header>
          <Layout style={{ marginTop: '64px'}}>
            <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
              <Menus/>
            </Sider>
            <Content style={{ marginLeft: 200 }}>
              <Breadcrumb itemRender={itemRender} routes={routes}/>
              <div>
                <Route exact path='/' component={Home}/>
                <Route path='/detail' component={Detail}/>
                <Route path='/list' render={()=>{return <List/>}}/>
                {/* <Route path='*' component={Notfound}/> */}
              </div>
            </Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    </Router>
  </Provider>
);
export default Routes;
