/*
* 展示空数据的盒子
* API: {
*   show: true, // true 时提示 "暂无数据"
*   emptyProps: {}, // 原 Empty 组件的 API 入口
* }
* */

import React from 'react';
import { Empty } from 'antd';

export default (props) => {
  const { show = true, children, emptyProps = {} } = props;

  return show ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} {...emptyProps} /> : children;
}
