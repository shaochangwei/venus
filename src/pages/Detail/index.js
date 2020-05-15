import  React,{ Component } from 'react';
import { Button } from 'antd';
import './index.less';
import Basic from './Basic';
export default class Detail extends Component {
  
  onSave = () => {
    this.save()
  };

  getSave = (save) => {
    this.save = save
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.onSave}>这是详情啊</Button>
        <Basic getSave={this.getSave} />
      </div> 
    );
  }
}
