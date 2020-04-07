import { routerRedux } from 'dva';
import { fetchInfo } from '../services/user';

export default {
  namespace: 'global',

  state: {
    info: {},
    permissions: null,
    perMenus: null,
  },

  effects: {
    // 公共跳转方法
    *GOTO({ payload }, { put }) {
      yield put(routerRedux.push(payload));
    },

    *INFO({ payload }, { call, put }) {
      const res = yield call(fetchInfo, payload);

      if (res && res.success) {
        const { dataObject = {} } = res;
        yield put({
          type: 'setData',
          payload: {
            info: dataObject,
            permissions: dataObject.authFunctionList || [],
            perMenus: dataObject.authMenus || [],
          },
        });
      }
    },
  },

  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      // 当路由只有域名时，重定向至登录页。
      if (history.location.pathname === '/') {
        dispatch({
          type: 'GOTO',
          payload: '/home',
        });
      }
    },
  },
};
