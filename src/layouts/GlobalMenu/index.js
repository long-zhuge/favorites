import React from 'react';
import { Menu } from 'antd';
import styles from './index.less';

export default class GlobalMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuKey: props.routerItem.path,
    };
  }

  handleClick = (e) => {
    this.setState({ menuKey: e.key });

    window.App_store.dispatch({
      type: 'GLOBAL/GOTO',
      payload: e.key,
    });
  };

  render() {
    const { menuKey } = this.state;

    return (
      <Menu
        className={styles.menu}
        onClick={this.handleClick}
        selectedKeys={[menuKey]}
        mode="horizontal"
      >
        <Menu.Item key="/favorites/index.html">主页</Menu.Item>
        <Menu.Item key="/favorites/base64">base64</Menu.Item>
        {/*<Menu.Item key="/favorites/excel">excel</Menu.Item>*/}
        <Menu.Item key="/favorites/qrcode">二维码</Menu.Item>
      </Menu>
    );
  }
}
