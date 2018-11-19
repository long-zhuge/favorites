/*
* 全局 model 放这里
* */
import { HOME_NAMESPACE, FETCH_LIST } from '../actions/home';
import { fetchNavList } from '../services/home';

export default {
  namespace: HOME_NAMESPACE,

  state: {
    data: [],
  },

  effects: {
    *[FETCH_LIST]({ payload }, { call, put }) {
      const data = yield call(fetchNavList, payload);

      if (data && data.stat === 'ok') {
        yield put({
          type: 'setData',
          payload: {
            data: data.dataList,
          },
        });

        window.DATALIST = data.dataList;
      }
    },
  },

  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
