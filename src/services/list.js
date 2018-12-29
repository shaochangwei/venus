import { get } from '../utils/request';

/**
 * 获取列表页信息
 * @param {object} param 入参活动id
 * @return {object} 请求结果
 */

export async function getList(param){
  const res = await get('/mock/list.json', param);
  return res;
}