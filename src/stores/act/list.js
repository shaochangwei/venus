import { observable, action } from 'mobx';
import { getList } from '../../services/list.js';

class ListStor {
  @observable dataList = [1,2,3];

  @action
  async getList() {
    let result =  await getList();
    if(result&&result.data){
      let { data } = result;
      this.dataList = data.data;
    }
  }
}
export default new ListStor();