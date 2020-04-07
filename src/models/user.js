import { routerRedux } from 'dva';
import { fetchLogin, fetchLogout, changePwd, changePersonalInfo } from '../services/user';
import { getUrlParameter, toast } from '../utils';

export default {
  namespace: 'user',

  state: {},

  effects: {
    *login({ payload }, { call, put }) {
      const res = yield call(fetchLogin, payload);

      if (res && res.success) {
        // 判断当前是否有 go 属性，如果有，则跳转，否则进入欢迎页
        const go = getUrlParameter('go');

        if (go) {
          /*
          * 此处获取 go 参数会有如下问题：
          *   1. 如果参数是一个 url 地址，则会获取不到，所以需要读取 search 来进行截取。
          * */
          yield put(routerRedux.push(window.location.search.replace('?go=', '')));
        } else {
          yield put(routerRedux.push('/welcome'));
        }
      }
    },
    // 退出登录
    *logout({ payload }, { call, put }) {
      yield put(routerRedux.push('/user/login'));
      yield call(fetchLogout, payload);
    },
    // 个人中心
    *changePersonalInfo({ payload }, { call }) {
      const res = yield call(changePersonalInfo, payload);
      if (res && res.success) {
        toast('success', '修改成功');
      }
    },
    // 安全设置
    *changePwd({ payload }, { call }) {
      const res = yield call(changePwd, payload);
      if (res && res.success) {
        toast('success', '修改成功');
      }
    },
  },

  reducers: {},
};
