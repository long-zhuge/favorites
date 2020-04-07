/*
* 函数权限判断。
* */

export default (permissions = [], code = '') => {
  // global.modal 中的 permissions 可能为 null，故需要进行前置判断
  if (permissions) {
    // 当 code 是数组时
    if (code instanceof Array) {
      const isTrue = permissions.some(item => code.includes(item));

      if (isTrue) {
        return true;
      }
    }

    // 当 code 为字符串时
    if (typeof code === 'string' && permissions.includes(code)) {
      return true;
    }
  }
}
