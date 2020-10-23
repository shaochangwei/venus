/*eslint-disable*/
import  React,{ Component } from 'react';
import { Button } from 'antd';
import { Route } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import './index.less';


@inject('actList')
@observer
export default class List extends Component {
  state={
    choose:0,
    show:false,
    list:[123,123,123,123,123,123,123,123,123,123,123]
  }
  componentDidMount(){
   this.props.actList.getList()
  }
  hanleShow=()=>{
    this.setState({
      show:!this.state.show
    })
  }
  onChoose=(index)=>{
    this.setState({
      choose:index
    })
  }
  render() {
    let datalist = this.props.actList.dataList.toJS()
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
        <div className="exam" style={{height:this.state.show?"100px":""}}>
        <div className="left">
          <div className="flex">
            
            {
              this.state.list.map((item,index)=>{
              return <div className={`flex-item ${this.state.choose==index?"active":""}`} onClick={()=>{this.onChoose(index)}}>{item}</div>
              })
            }
          </div>
          
          </div>
          <div className="right" onClick={this.hanleShow}>
            jaskldjklsja
          </div>
          </div>
      </div> 
    );
  }
}