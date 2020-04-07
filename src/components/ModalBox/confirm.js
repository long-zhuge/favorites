/*
* 由于 modal.info 组件不支持取消按钮等。故使用 confirm 组件重定义 icon
* */

import React from 'react';
import { Modal, Icon } from 'antd';

export default (props) => {
  return (
    Modal.confirm({
      ...props,
      icon: <Icon type="info-circle" style={{ color: '#1890ff' }} />,
    })
  );
}
