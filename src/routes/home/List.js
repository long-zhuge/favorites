import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { HOME_NAMESPACE } from '../../actions/home';
import styles from './List.less';

class List extends React.Component {
  render() {
    const { data } = this.props;

    if (data.length > 0) {
      return (
        <Row className={styles.itemList} gutter={8}>
          {
            data.map(item => (
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
}

// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  const { data } = state[HOME_NAMESPACE];
  return { data };
}

// 关联 model
export default connect(mapStateToProps)(List);
