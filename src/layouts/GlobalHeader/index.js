/*
* 全局页头部分
* */

import React from 'react';
import { Layout, Row, Col } from 'antd';
import { GLOBAL_TITLE } from '../../actions';
import GlobalMenu from '../GlobalMenu';
import Thanks from './Thanks';
import styles from './index.less';

function GlobalHeader(props) {
  return (
    <Layout.Header className={styles.header}>
      <Row>
        <Col span={3} className={styles.logo}>
          <div className={styles.title}>
            {GLOBAL_TITLE}
            <div className={styles.line_wrapper}>
              <div className={styles.line} />
            </div>
          </div>
        </Col>
        <Col span={19}>
          <GlobalMenu routerItem={props.routerItem} />
        </Col>
      </Row>
    </Layout.Header>
  );
}

export default GlobalHeader;
