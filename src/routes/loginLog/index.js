import React from 'react';
import { connect } from 'dva';
import { stringify } from 'qs';
import request from '../../utils/request';
import { Table } from 'antd';

@connect(({ global }) => {
  const { info } = global;
  return { info };
})
class LoginLog extends React.PureComponent {
  columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
    }, {
      title: '登录/登出时间',
      dataIndex: 'gmtCreate',
    },
  ];
  state = {
    loading: false,
    data: {},
  };

  componentDidMount() {
    this.fetchList();
  }

  fetchList = (params) => {
    request({
      that: this,
      url: `/system/loginLog/page.json?${stringify(params)}`,
      onSuccess: (res) => {
        this.setState({
          data: res.dataObject || {},
        });
      },
    })
  };

  render() {
    const { loading, data } = this.state;
    const { info } = this.props;

    if (info.userCode === 'administrator') {
      return (
        <Table
          bordered
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={data.datas || []}
          pagination={{
            hideOnSinglePage: true,
            current: data.currPageNo || 1,
            pageSize: data.limit || 20,
            total: data.total || 1,
            onChange: (currPageNo) => {
              this.fetchList({ currPageNo })
            },
          }}
        />
      );
    }

    return '权限不足';
  }
}

export default LoginLog;
