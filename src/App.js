import  React,{ Component } from 'react';
import './App.css';

export default class App extends Component {
  state={
    //数据从ajax获取，然后setState，在componentdidmount中发请求，我直接写死自己去请求
    data:[{
      xingming:'sdfsdf',
      nianling:'12',
      dizhi:'sd',
      dianhua:'1232144'
    },{
      xingming:'sdfsdf',
      nianling:'12',
      dizhi:'sd',
      dianhua:'1232144'
    },{
      xingming:'sdfsdf',
      nianling:'12',
      dizhi:'sd',
      dianhua:'1232144'
    },{
      xingming:'sdfsdf',
      nianling:'12',
      dizhi:'sd',
      dianhua:'1232144'
    },{
      xingming:'sdfsdf',
      nianling:'12',
      dizhi:'sd',
      dianhua:'1232144'
    }]
  }
  render() {
    return (
      <div>
        <table>
          <th>
            <td>xingming</td>
            <td>nianling</td>
            <td>dizhi</td>
            <td>dianhua</td>
          </th>
          {this.state.data.map( (item) =>{
            return(
              <tr>
                <td>{item.xingming}</td>
                <td>{item.nianling}</td>
                <td>{item.dizhi}</td>
                <td>{item.dianhua}</td>
              </tr>
            );
          } )
          }
        </table>
      </div> 
    );
  }
}
//发请求开始让loading的图片显示，在成功的回调里把loading弄没


