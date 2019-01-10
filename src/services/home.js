import qs from 'qs';
import request from '../utils/request';

export async function fetchNavList(params) {
  return request(`navList.json?${qs.stringify(params)}`);
}
