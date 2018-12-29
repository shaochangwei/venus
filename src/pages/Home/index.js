import  React,{ Component } from 'react';
import { Divider, Progress, Carousel, Button } from 'antd';
import './index.less';

export default class Home extends Component {
  
  dime= () => {
    return (
      <div>
        <Divider orientation="left">Left Text</Divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
        <Divider orientation="right">Right Text</Divider>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
      </div>
    );
  }
  render() {
    return (
      <div>
        <Carousel autoplay className='banner'>
          <div><img src='https://i1.mifile.cn/a4/xmad_15379643037466_lnQCW.jpg'/></div>
          <div><img src='https://i1.mifile.cn/a4/xmad_15381034374429_PkRwL.jpg'/></div>
          <div><img src='https://i1.mifile.cn/a4/xmad_15375484770035_SxAhy.jpg'/>></div>
          <div><img src='https://i1.mifile.cn/a4/xmad_15379651091209_GbxNp.jpg'/></div>
        </Carousel>
        {
          this.dime()
        }
        {
          this.dime()
        }
        {
          this.dime()
        }
        {
          this.dime()
        }
        {
          this.dime()
        }
        {
          this.dime()
        }
        <div>
          <Progress type="circle" percent={75} format={percent => `${percent} Days`} />
          <Progress type="circle" percent={100} format={() => 'Done'} />
        </div>
        <div className="App">
          <Button type="primary">Button</Button>
        </div>
      </div> 
    );
  }
}


