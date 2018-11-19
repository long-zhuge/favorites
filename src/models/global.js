/*
* 全局 model 放这里
* */
import { routerRedux } from 'dva/router';
import { getRouteData } from '../utils';

export default {
  namespace: 'GLOBAL',

  state: {
    routerItem: {},
  },

  effects: {
    *GOTO({ payload }, { put }) {
      yield put(routerRedux.push(payload));
    },

    *ROUTER_ITEM({ payload }, { put }) {
      yield put({
        type: 'setRouterItem',
        payload: {
          routerItem: payload,
        },
      });
    },

  },

  reducers: {
    setRouterItem(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  subscriptions: {
    setup({ history, dispatch }) {
      const routeData = getRouteData('BasicLayout');
      // 监听路由变化
      history.listen(({ pathname }) => {
        const routerItem = routeData.filter(item => item.path === pathname)[0];

        if (routerItem && routerItem.component) {
          dispatch({
            type: 'ROUTER_ITEM',
            payload: routerItem,
          });
        } else {
          dispatch({
            type: 'GOTO',
            payload: '/favorites/dist',
          });

          dispatch({
            type: 'ROUTER_ITEM',
            payload: routeData[0],
          });
        }
      });
    },
  },
};
