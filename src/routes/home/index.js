import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import { HOME_NAMESPACE, FETCH_LIST } from '../../actions/home';
import SearchInput from './SearchInput';
import List from './List';

class Home extends React.Component {
  componentDidMount() {
    if (!window.DATALIST) {
      this.props.dispatch({
        type: `${HOME_NAMESPACE}/${FETCH_LIST}`,
      });
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <Spin spinning={loading}>
        <SearchInput />
        <List />
      </Spin>
    );
  }
}

// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  return {
    loading: state.loading.models[HOME_NAMESPACE],
  };
}

// 关联 model
export default connect(mapStateToProps)(Home);
