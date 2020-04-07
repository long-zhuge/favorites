import React from 'react';
import { Row, Col } from 'antd';
import styles from './List.less';

export default (props) => {
  const { dataSource = [] } = props;

  if (dataSource.length > 0) {
    return (
      <Row className={styles.itemList} gutter={8}>
        {
          dataSource.map(item => (
            <Col span={8} key={item.url}>
              <a
                className={styles.item}
                // eslint-disable-next-line
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p dangerouslySetInnerHTML={{ __html: item.title }} />
                <p
                  className={styles.item_introduce}
                  dangerouslySetInnerHTML={{ __html: item.introduce }}
                />
              </a>
            </Col>
          ))
        }
      </Row>
    );
  }

  return (
    <div className={styles.no_list}>同学，你搜索的是什么玩意？没有数据哟！！！</div>
  );
}
