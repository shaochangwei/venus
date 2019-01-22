/*eslint-disable*/
import  React,{ Component } from 'react';
import { Button } from 'antd';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import './index.less';


@inject('actList')
@observer
export default class List extends Component {
  
  componentDidMount(){
   this.props.actList.getList()
  }
  render() {
    let datalist = this.props.actList.dataList.toJS()
    console.log(datalist)
    return (
      <div>
        <div>
          <Route path="/list/list" render={()=>{
            return <div>
              {
                [1,2,3,4,5,6].map(item => {
                  return <div key={item}>{item+'hasjdksadlkasj'}</div>;
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
        <Button type="primary">这是列表啊</Button>
      </div> 
    );
  }
}