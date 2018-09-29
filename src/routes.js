import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';
//import Notfound from './pages/Notfound';
import Common from './pages/Common';

const Routes=()=>(
  <BrowserRouter >
    <div>
      <div>
        <Common />
      </div>
      <div>
        <Route exact path='/' component={Home}/>
        {/* <Route path='/home' component={Home}/> */}
        <Route path='/detail' component={Detail}/>
        <Route path='/list' component={List}/>
        {/* <Route path='*' component={Notfound}/> */}
      </div>
      
    </div>
  </BrowserRouter>
);
export default Routes;
