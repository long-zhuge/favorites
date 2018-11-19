/*
* 全局工具包
* */

import cloneDeep from 'lodash/cloneDeep';
import { message } from 'antd';
import navData from '../common';

// 重写数组实例的 includes()，匹配是否成功，返回：true/false
export function includes(arr, value) {
  return Array.prototype.includes ? arr.includes(value) : arr.some(el => el === value);
}

// 子路由解析
function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach((node) => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.menu = parentPath;
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

// 路由解析
export function getRouteData(path = 'BasicLayout') {
  if (!navData.some(item => item.layout === path) ||
    !(navData.filter(item => item.layout === path)[0].children)) {
    return null;
  }
  const dataList = cloneDeep(navData.filter(item => item.layout === path)[0]);
  const nodeList = getPlainNode(dataList.children);
  const routerList = [];

  nodeList.forEach((item) => {
    routerList.push({
      ...item,
      exact: true,
      menu: item.path,
    });
    if (item.children) {
      routerList.push(...getPlainNode(item.children, item.path));
    }
  });

  return routerList.length > 0 ? routerList : nodeList;
}

// 全局 toast 提示
// type: [success, error, warning]
export function toast(type, text, time = 3) {
  return message[type](text, time);
}

// 字符串url链接获取参数
export function getUrlParameter(name, link = window.location.href) {
  let url = link;
  url = url.slice(url.indexOf('?'), url.length);
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = url.substr(1).match(reg);

  if (r !== null) {
    return unescape(r[2]);
  }

  return null;
}

// 获取缓存信息
export function getSession() {
  const { session } = window.sessionStorage;

  return session ? JSON.parse(session) : {};
}

// 获取-cookie
export function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const cookies = document.cookie.split(';');
  // eslint-disable-next-line
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }

  return '';
}

// 生产随机数，可指定位数
export function genNonDuplicateID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
