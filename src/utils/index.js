import { message } from 'antd';
import moment from 'moment';
import AppStore from '../index';

export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path
  );
  routes = routes.map(item => item.replace(path, ''));
  return routes.map(item => {
    return {
      exact: true,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}

// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}

/*
* yield 队列的延迟，默认时间 2000ms
* 调用方式：
*   Generator：yield delay(1000)
*   fun：delay(1000).then(() => console.log('success'));
* */

export function delay(time = 2000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

// 全局 toast 提示
// type: [success, error, warning, loading]
message.config({maxCount: 1});
export function toast(props) {
  const {
    type = 'success',
    text = '',
    time = 3,
    cb = () => {},
  } = props;
  const hide = message[type](text, time);
  cb(hide);
  return hide;
}

// 组件内封的 fetch 请求需要有一个超时返回登录态的功能
export function loginTimeOut(data) {
  if (data && ['DENY', 'UNLOGIN'].includes(data.errorCode)) {
    // 判断当前是否已经弹窗提示，防止多次 dispatch
    const msgEle = document.getElementsByClassName('ant-message-notice');
    const { pathname, search } = window.location;
    if (msgEle.length === 0) {
      toast({ type: 'error', text: '登录超时，请重新登录' });
      // 当在登录页面发生登录超时，不再进行重定向
      if (!(pathname.includes('login'))) {
        delay(1000).then(() => {
          AppStore.dispatch({
            type: 'global/GOTO',
            payload: `/user/login?go=${pathname}${search}`,
          });
        });
      }
    }
    return false;
  }
  return data;
}

// 字符串url链接获取参数
export function getUrlParameter(name, link = window.location.href) {
  const url = link.slice(link.indexOf('?'), link.length);
  const r = url.substr(1).match(new RegExp(`(^|&)${name}=([^&]*)(&|$)`));

  if (r !== null) {
    return unescape(r[2]);
  }

  return null;
}

// 获取 url 参数集合
export function getUrlParams(url) {
  const d = decodeURIComponent;
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  const obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0]; // eslint-disable-line
    const arr = queryString.split('&');
    for (let i = 0; i < arr.length; i += 1) {
      const a = arr[i].split('=');
      let paramNum;
      const paramName = a[0].replace(/\[\d*\]/, (v) => {
        paramNum = v.slice(1, -1);
        return '';
      });
      const paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      if (obj[paramName]) {
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = d([obj[paramName]]);
        }
        if (typeof paramNum === 'undefined') {
          obj[paramName].push(d(paramValue));
        } else {
          obj[paramName][paramNum] = d(paramValue);
        }
      } else {
        obj[paramName] = d(paramValue);
      }
    }
  }
  return obj;
}


// 生产随机数，可指定位数
export function genNonDuplicateID(length = 2) {
  return Math.random().toString(16).substring(2, length + 2);
}

/*
* moment 和 dateString 之间的转化
* API: {
*   value: 值
*   isMoment: 是否转化成 string，默认 是
*   format: 转化格式，YYYY-MM-DD HH:mm:ss
* }
* */
export function mmtToStr(value, isMoment = true, format = 'YYYY-MM-DD') {
  if (value) {
    if (isMoment) {
      return moment.isMoment(value) ? value.format(format) : moment(value).format(format);
    }

    return moment(value, format);
  }
}

// 数字千位符过滤，补充后面的小数点
export function toThousands(value, isFormatter = true) {
  // 将字符转成千位符
  if (isFormatter) {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // 将千位符转成普通数字
  return value.replace(/\$\s?|(,*)/g, '');
}

// Table 列表的翻页组件数据
export const pagination = (data, cb, ...props) => {
  return {
    ...props,
    hideOnSinglePage: true,
    current: data.pageNum || data.currPageNo || 1,
    pageSize: data.pageSize || data.limit || 20,
    total: data.totalCnt || data.total || 1,
    onChange: cb,
  };
};

/*
* 无刷新改变地址栏
* API：{
*   url: 需要改变的地址栏，默认是当前无参数地址url
*   isBack: 是否需要回跳状态
* }
* */
export function historyState(url = `${window.location.origin}${window.location.pathname}`, isBack = false) {
  window.history[isBack ? 'pushState' : 'replaceState'](Date.now(),'', url);
}
