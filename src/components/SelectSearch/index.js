/*
* SelectSearch: 带搜索功能的下拉框组件，可多选。可作为 form 的受控组件
* API: {
*   url：请求地址，必须携带入参。如：/xxx/xxx.json?keywords=
*   placeholder：提示文案
*   fields：[key, label]
*   this.refs.reset()：重置组件
*   isData: 是否返回选项的所有数据，默认 false
*   customOption(fun(record)): 自定义 option 内容
*   isAll: true, 输入空格时，是否查询全部内容
*   afterFetch: 后端返回的数组中，需要 return 的数组对象
*   onChange: 选中 option 时调用此函数
* }
* */

import React from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash.debounce';
import { PROXY } from 'actions';

export default class SelectSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      data: [],
      loading: false,
    };
    this.onFetch = debounce(this.onFetch.bind(this), 600);
  }

  reset = () => {
    this.setState({
      value: [],
      data: [],
    });
  };

  // 自定义异步功能
  onFetch(value) {
    const { url, afterFetch, isAll = true } = this.props;
    this.setState({ data: [] }, () => {
      const text = isAll ? value : value.trim();

      if (text && text !== '') {
        this.setState({ loading: true }, () => {
          fetch(`${PROXY}${url}${value}`)
            .then(response => response.json())
            .then(data => {
              const res = (afterFetch && afterFetch(data)) || [];
              this.setState({ loading: false, data: res });
            })
        });
      }
    });
  }

  // 选中后进行数据过滤
  handleChange = (value) => {
    const { isData, onChange} = this.props;
    let newValue;

    if (isData && value) {
      try {
        newValue = value.map(item => (JSON.parse(item)));
      } catch (err) {
        newValue = JSON.parse(value);
      }
    } else {
      newValue = value;
    }

    this.setState({ value }, () => {
      // eslint-disable-next-line
      onChange && onChange(newValue);
    });
  };

  // 多个组件同时使用时，在输入值后进行切换会报错，需要在失去焦点时进行数据重置
  onBlur = () => {
    this.setState({ data: [] });
  };

  render() {
    const { loading, value, data } = this.state;
    const { fields, isData = false, customOption } = this.props;

    return (
      <Select
        value={value}
        {...this.props}
        showSearch
        style={{ width: '100%' }}
        notFoundContent={loading ? <Spin size="small" /> : '暂无数据'}
        filterOption={false}
        onSearch={this.onFetch}
        onChange={this.handleChange}
        onBlur={this.onBlur}
      >
        {data.map(item => (
          <Select.Option
            key={isData ? JSON.stringify(item) : item[fields[0]]}
          >
            {(customOption && customOption(item)) || item[fields[1]]}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
