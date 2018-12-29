
import  React,{ Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import { withRouter } from 'react-router-dom';


class Menus extends Component {

  componentWillMount(){
    //console.log('mount');/*eslint-disable-line */
  }

  state = {
    current: '1',
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  
  render() {
    const {history} = this.props;
    //console.log(this.props); /*eslint-disable-line */
    return (
      <div>
        <Menu
          theme='dark'
          onClick={this.handleClick}
          style={{ width:'100%' }}
          defaultOpenKeys={['sub1','sub2']}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <Menu.Item key="1" type="desktop" onClick={()=>{history.push('/');}}>
            <Icon type="user"/>
            首页
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>项目</span></span>}>
            <Menu.Item key="2" onClick={()=>{history.push('/list');}}>项目列表</Menu.Item>
            <Menu.Item key="3" onClick={()=>{history.push('/detail');}}>项目详情</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="setting" /><span>活动中心</span></span>}>
            <Menu.Item key="4" onClick={()=>{history.push('/list/list');}}>活动列表</Menu.Item>
            <Menu.Item key="5" onClick={()=>{history.push('/list/detail');}}>活动详情</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default withRouter(Menus);