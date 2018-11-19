import React from 'react';
import { Button, Modal, Row, Col } from 'antd';
import { WX_BASE64, ZFB_BASE64 } from '../../actions/thanks';
import styles from './index.less';

class Thanks extends React.Component {
  state = {
    visible: false,
  };

  onShow = () => {
    this.setState({
      visible: true,
    });
  };

  onHide = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible } = this.state;

    return (
      <div className={styles.thanks}>
        <Button onClick={this.onShow}>答谢</Button>
        <Modal
          closable={false}
          width={600}
          title="Thanks"
          visible={visible}
          onCancel={this.onHide}
          footer={false}
        >
          <div className={styles.thanks_content}>
            <Row gutter={8}>
              <Col span={12} >
                <img src={ZFB_BASE64} alt="支付宝" />
                <p>支付宝</p>
              </Col>
              <Col span={12} >
                <img src={WX_BASE64} alt="微信" />
                <p>微信</p>
              </Col>
            </Row>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Thanks;
