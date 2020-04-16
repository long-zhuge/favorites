import React, { useState } from 'react';
import { useDispatch } from 'dva';
import { Menu } from 'antd';
import { ContentBox, BgMusic } from 'components';
import styles from './index.less';

export default (props) => {
  const dispatch = useDispatch();
  const [menuKey, setMenuKey] = useState(props.location.pathname);

  const handleClick = (e) => {
    setMenuKey(e.key);

    dispatch({
      type: 'global/GOTO',
      payload: e.key,
    });
  };

  return (
    <div className={styles.container}>
      <ContentBox>
        <div className={styles.header}>
          <div className={styles.logo}>
            FAVORITES
          </div>
          <Menu
            className={styles.menu}
            onClick={handleClick}
            selectedKeys={[menuKey]}
            mode="horizontal"
          >
            <Menu.Item key="/home">主页</Menu.Item>
            <Menu.Item key="/base64">base64</Menu.Item>
            {/*<Menu.Item key="/favorites/excel">excel</Menu.Item>*/}
            <Menu.Item key="/qrcode">二维码</Menu.Item>
            <Menu.Item key="/pdf">PDF</Menu.Item>
            <Menu.Item key="/signature">签名</Menu.Item>
            <Menu.Item key="/forge">加密</Menu.Item>
            {/*<Menu.Item key="/favorites/markdown">markdown</Menu.Item>*/}
            {/*<Menu.Item key="/favorites/chiHuang">图片鉴黄</Menu.Item>*/}
          </Menu>
          <BgMusic />
        </div>
      </ContentBox>
    </div>
  );
}
