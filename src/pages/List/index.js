import  React,{ Component } from 'react';
import { Button } from 'antd';
import { Route } from 'react-router-dom';
import './index.less';

export default class List extends Component {
  
  render() {
    return (
      <div>
        <div>
          <Route path="/list/list" render={()=>{
            return <div>
              {
                [1,2,3,4,5,6].map(item => {
                  return <div key={item}>{item}</div>;
                })
              }
            </div>;
          }} >
            
          </Route>
          <Route path="/list/detail" render={() => {
            return <div>222222detail</div>;
          }} >
            
          </Route>
        </div>
        <Button type="primary">List</Button>
      </div> 
    );
  }
}