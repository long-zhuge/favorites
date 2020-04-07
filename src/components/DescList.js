/*
* 描述列表组件，如展示基本信息等
* API: {
*   dataSource: {} // 数据源
*   defaultValue: 当值不存在时默认展示的字符串，默认 = '--'
*   column: '4', 一行展示的字段个数
*   columns: [ // 列描述数据对象
*     {
*       title: '', // label的名称
*       dataIndex, // 列数据在数据项中对应的 key，支持嵌套写法"key.key.key"
*       unVisible: true, // 不显示
*       render: (record) => {},
*     },
*   ]
* */

import React from 'react';
import { Descriptions } from 'antd';

export default class DescList extends React.Component {
  static defaultProps = {
    dataSource: {},
    size: 'small',
    column: 4,
    columns: [],
    defaultValue: '--',
  };

  // 可支持嵌套获取值，如 "key.key.key"
  deepGet = (object, path, defaultValue) => {
    return (!Array.isArray(path) ? path.replace(/\[/g, '.').replace(/\]/g, '').split('.') : path)
      .reduce((o, k) => (o || {})[k], object) || defaultValue;
  };

  // 需要进行 react 组件的判断
  renderValue = (value) => {
    if (React.isValidElement(value)) {
      return value;
    } else {
      if (value && value !== null && value !== '') {
        return value;
      }

      return this.props.defaultValue;
    }
  };

  // 子项的渲染
  renderItem = () => {
    const { dataSource, columns, defaultValue } = this.props;

    return columns.map((item, index) => {
      const { title, dataIndex, render, unVisible } = item;

      if (unVisible) {
        return null;
      }

      const value = render ? render(dataSource) : this.deepGet(dataSource, dataIndex, defaultValue);

      return (
        // eslint-disable-next-line
        <Descriptions.Item label={title} key={index}>
          {this.renderValue(value)}
        </Descriptions.Item>
      )
    })
  };

  render() {
    return (
      <Descriptions {...this.props}>
        {this.renderItem()}
      </Descriptions>
    );
  }
}
