/*
* 权限判断组件
* API：{
*   code(String/Array): 对应的权限码
*     string: 'stage_node_edit'
*     array: ['stage_node_edit', 'stage_page_status']
*     isShow: 是否展示 403 组件。一般用于子组件无权限时的展示
* }
* */

import React from 'react';
import { connect } from 'dva';
import { Link } from 'components';
import Exception from 'components/Exception';
import authorizedFun from './authorizedFun';

@connect(({ global }) => ({
  permissions: global.permissions,
}))
class AuthorizedComponent extends React.Component {
  static defaultProps = {
    code: '',
    permissions: [],
    isShow: false, // 是否展示 403 权限提示
    children: null, // 在无组件返回时，必须返回null，否则 react 报错
  };

  render() {
    const { code, permissions, children, isShow } = this.props;

    if (permissions) {
      // 当 code 是数组时
      if (code instanceof Array) {
        const isTrue = permissions.some(item => code.includes(item));

        if (isTrue) {
          return children;
        }
      }
      // 当 code 为字符串时
      if (typeof code === 'string' && permissions.includes(code)) {
        return children;
      }

      if (isShow) {
        return <Exception type="403" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />;
      }
    }

    return null;
  }
}

AuthorizedComponent.fun = authorizedFun;

export default AuthorizedComponent;
