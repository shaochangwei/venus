import { observable, action } from 'mobx';
import { getList } from '../../services/list.js';

class ListStor {
  @observable dataList = [1,2,3];

  @action
  getList() {
    let result = getList();
    let { data } = result;
    if(data) this.haha = data;
  }
}
export default new ListStor();