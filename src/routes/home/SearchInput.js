/*
* 首页，搜索各种链接等
* */

import React from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
import { HOME_NAMESPACE } from '../../actions/home';

class SearchInput extends React.Component {
  onSearch = (e) => {
    // 拷贝原始数据
    const { dispatch } = this.props;
    const data = window.DATALIST.concat();
    const { value } = e.target;
    const reg = new RegExp(value, 'gi');

    if (value.trim() !== '') {
      if (value === '19910605') {
        // todo: 这里是要写情书的地方。
        dispatch({
          type: 'GLOBAL/GOTO',
          payload: '/love',
        });
        return;
      }

      const arr = [];
      data.forEach((item) => {
        const { title, introduce } = item;

        if (reg.test(title) || reg.test(introduce)) {
          const obj = {
            ...item,
            title: title.replace(reg, `<span style="color:#ff6c00;">${value}</span>`),
            introduce: introduce.replace(reg, `<span style="color:#ff6c00;">${value}</span>`),
          };

          arr.push(obj);
        }
      });

      dispatch({
        type: `${HOME_NAMESPACE}/setData`,
        payload: { data: arr },
      });
    } else {
      dispatch({
        type: `${HOME_NAMESPACE}/setData`,
        payload: { data },
      });
    }
  };

  render() {
    return (
      <Input.Search
        style={{ width: 200 }}
        placeholder="同学，来搜一发"
        onInput={this.onSearch}
      />
    );
  }
}

// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  const { data } = state[HOME_NAMESPACE];
  return { data };
}

// 关联 model
export default connect(mapStateToProps)(SearchInput);
