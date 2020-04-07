/*
* 封装 antd 的 Tag 组件，前后可输入名称。
* API：{
*   addonBefore: 前置文本
*   addonAfter: 后置文本
*   children: 标签名称
*   color: 标签颜色
*   background: bool，是否展示背景色，默认展示。请谨慎使用，可能产生超乎预期的表现。
* }
* */

import React from 'react';
import { Tag } from 'antd';

export default class TagWithAddon extends React.PureComponent {
  static defaultProps = {
    color: 'blue',
    background: true,
  };

  render() {
    const { addonBefore, addonAfter, children, color, background } = this.props;

    return (
      <React.Fragment>
        {addonBefore}
        {children && (
          <Tag
            color={color}
            style={{
              marginLeft: addonBefore && 8,
              background: !background && 'none',
            }}
          >
            {children}
          </Tag>
        )}
        {addonAfter}
      </React.Fragment>
    );
  }
}
