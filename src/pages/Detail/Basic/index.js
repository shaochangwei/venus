import  React,{ Component } from 'react';
export default class index extends Component {
  save=()=>{
    console.log('done')
 }

 componentDidMount ()  {
     this.props.getSave(this.save)
 }

  render() {
    
    return (
      <div>
        <div type="primary">这是子组件</div>
      </div> 
    );
  }
}