import React, { Component } from 'react';
import PropTypes from 'prop-type';
import { Table, Pagination, Row, Col, Spin } from 'antd';

//超级列表
export default class SearchableTable extends Component {

  static propTypes = {
    paginationProps: PropTypes.object,//传入分页器的prpos
    searchInfo: PropTypes.object,//初始化搜索数据，搜索表单的初始值需要在组建外自行设置
    current: PropTypes.number,//初始化当前页数
    pageSize: PropTypes.number,//初始化每页显示的数量
    total: PropTypes.number,//初始化总数量
    footer: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),//底部渲染函数，置为 false 时不显示底部，true 时显示默认的分页器
    from: PropTypes.func.oneOfType([PropTypes.func, PropTypes.bool]),//搜索表单渲染函数，置为布尔值时不显示搜索表单，入参为 function doSearch(searchInfo){}
    fetch: PropTypes.func.isRequired,//返回 promise 的远程调用函数，需要保证处理后的响应内容为{ current,pageSize,total,data } 形式
    onChange: PropTypes.object,//搜索表单点击搜索，分页器点击页码时执行回调，可用于将数据存入store，参数为变更后的表单或分页器数据，变更后的全量数据
    style: PropTypes.object,//样式
    className: PropTypes.string//类名
  }

  static defaultProps = {
    current: 1,
    pageSize: 10,
    total: 0,
    footer: true
  }

  constructor(props){
    super(props);
    const { searchInfo, current, pageSize, total } = props;
    this.state = {
      searchInfo: searchInfo || {},
      pageInfo: {
        current: current,
        pageSize: pageSize,
        total: total
      },
      dataSource: [],
      loading: false
    };
  }

  componentDidMount(){
    const { searchInfo, pageInfo: { current, pageSize } } = this.state;
    this.fetch({ ...searchInfo, current, pageSize });
  }

  //获取远程数据
  fetch = async (params = {}) => {
    const { fetch } = this.props;
    this.setState({loading:true});
    const res = await fetch(params);
    this.setState({loading:false});
    if(!res) return;
    const { data: dataSource, ...pageInfo } = res;
    const { ...searchInfo } = params;
    this.setState({
      dataSource,
      pageInfo,
      searchInfo
    });
  }

  //根据已有参数，重新获取远程数据
  reload(){
    const { pageInfo: { pageSize, current }, searchInfo } = this.state;
    this.fetch({ current,pageSize, ...searchInfo });
  }

  //变更搜索表单数据
  changeSearchInfo = searchInfo => {
    const { onChange } = this.props;
    const { pageInfo: { pageSize, current } } = this.state;
    const params = { ...(searchInfo || {}), pageSize, current };
    onChange && onChange(searchInfo, params);
    this.fetch(params);
  }

  //改变页码
  changeCurrentPage = current => {
    const { onChange } = this.props;
    const { pageInfo:{ pageSize }, searchInfo } = this.state;
    const params = { ...searchInfo, pageSize, current };
    onChange && onChange({ current },params);
    this.fetch(params);
  }

  //改变每页显示数量
  changePageSize = pageSize => {
    const { onChange } = this.props;
    const { pageInfo: { current }, searchInfo } = this.state;
    const params = { ...searchInfo, pageSize, current };
    onChange && onChange({ pageSize }, params);
    this.fetch(params);
  }

  render(){
    const { paginationProps = {}, footer, form, style = {}, className, dataList } = this.props;
    const { pageInfo, dataSource = [], loading } = this.state;
    const { total } = pageInfo;
    const defaultClassName = 'search-list';
    const pagination = (
      <Pagination 
        style= {{ marginTop: 16 }}
        size= 'small'
        { ...paginationProps }
        {...(Object.keys(pageInfo).length ? pageInfo : {total: 0})}
        onChange= {this.changeCurrentPage}
        onPageSizeChange= {this.changePageSize}
        total= { total }
      />
    );
    return (
      <div className={className ? `${defaultClassName} ${className}` : defaultClassName } style={style}>
        <Spin spinning={loading} style={{width: '100%'}}>
          {/* 搜索表单 */}
          {form && form(this.changeSearchInfo)}

          {/* 搜索列表 */}
          <Table dataSource={dataList||dataSource} style={{marginTop:16}} bordered={false}>
            {this.props.children.map(child => child)}
          </Table>

          {/* 分页 */}
          {
            footer ? footer(pagination) : (
              <Row className='searchable-list-footer'>
                <Col span='12' className='searchable-list-footer-left'>
                  {this.props.footLeft || null}
                </Col>
                <Col span='12' style={{ textAlign: 'right' }} className='searchable-list-footer-right'>
                  { pagination }
                </Col>
              </Row>)
          }
        </Spin>
      </div>
    );
  }
}
