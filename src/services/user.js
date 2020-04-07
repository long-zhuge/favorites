import request from '../utils/request';

// 登陆
export async function fetchLogin(params) {
  return request({
    url: '/login.json',
    method: 'POST',
    body: params,
  });
}

// 退出登录
export async function fetchLogout() {
  return request({
    url: `/logout.json`,
  });
}

// 获取当前登录角色信息
export async function fetchInfo() {
  return request({
    url: `/system/user/info.json`,
  });
}

// 个人中心
export async function changePersonalInfo(params) {
  return request({
    url: '/system/user/edit.json',
    method: 'POST',
    body: params,
  })
}

// 修改密码
export async function changePwd(params) {
  return request({
    url: '/system/user/changePwd.json',
    method: 'POST',
    body: params,
  })
}
