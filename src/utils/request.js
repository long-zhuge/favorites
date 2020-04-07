import { fetch } from 'dva';
import { stringify } from 'qs';
import { toast, loginTimeOut, getUrlParams } from 'utils';
import { PROXY } from 'actions';
import store from '../index';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (/^50(.)$/.test(response.status)) {
    store.dispatch({
      type: 'global/GOTO',
      payload: '/exception/500',
    });

    return;
  }
  const error = new Error(response.statusText);
  error.response = response;

  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 * isError：true 时可自定义错误
 */
export default function request({ method = 'GET', headers, body, onStart, onSuccess, onError, that, ...params }) {
  // const defaultOptions = {
  //   credentials: 'include', // 请求凭证，会发送类似 cookie 等信息
  // };
  let { url } = params;
  const newOptions = { credentials: 'include', method, body, headers };
  const methodArr = ['POST', 'PUT', 'DELETE'];
  if (methodArr.indexOf(method) > -1) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  // eslint-disable-next-line
  onStart && onStart();
  // eslint-disable-next-line
  that && that.setState({ loading: true }); // 如果有 that 对象，则处理 loading 数据

  // 添加时间戳，解决 ie 下同一个 GET 请求不发送的问题
  if (method === 'GET' && url) {
    const urlArr = url.split('?');
    const urlParams = getUrlParams(url);
    url = `${urlArr[0]}?${stringify({...urlParams, t: new Date().getTime()})}`;
  }

  return fetch(`${PROXY}${url}`, newOptions)
    .then(checkStatus)
    .then(response => response.json())
    .then((data) => {
      if (loginTimeOut(data)) {
        // 只要存在一个，就表示是组件的请求方式
        if (onStart || onSuccess || onError) {
          // eslint-disable-next-line
          that && that.setState({ loading: false });
          if (data.success) return onSuccess && onSuccess(data);
          toast({ type: 'error', text: data.errorMessage || '系统异常' });
          return onError && onError(data);
        }
        // 都不存在，适合services的请求方式
        if (data && !data.success) {
          toast({ type: 'error', text: data.errorMessage || '系统异常' });
        }
        return data;
      }
    })
    .catch((error) => {
      // eslint-disable-next-line
      that && that.setState({ loading: false });
      if ('stack' in error && 'message' in error) {
        toast({ type: 'error', text: error.message || `请求错误: ${url}` });
      }

      return error;
    });
}
