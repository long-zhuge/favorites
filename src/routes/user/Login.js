import React from 'react';
import { connect } from 'dva';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['user/login'],
}))
export default class LoginPage extends React.PureComponent {
  handleSubmit = (err, values) => {
    if (!err) {
      this.props.dispatch({
        type: 'user/login',
        payload: values,
      });
    }
  };

  render() {
    const { submitting } = this.props;

    return (
      <div className={styles.main}>
        <Login defaultActiveKey="account" onSubmit={this.handleSubmit}>
          <Tab key="account" tab="欢迎登陆">
            <UserName name="account" />
            <Password name="password" />
          </Tab>
          <Submit loading={submitting}>登录</Submit>
        </Login>
      </div>
    );
  }
}
