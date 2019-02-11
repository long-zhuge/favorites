import React from 'react';
import { Input, Row, Col } from 'antd';
import QRCode from 'qrcode.react';

class Qd extends React.Component {
  state = {
    value: '',
  };

  handleQrcode = (e) => {
    const { value } = e.target;

    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    return (
      <Row>
        <Col span={12}>
          <Input.TextArea
            style={{ width: '65%', height: 200 }}
            placeholder="输入内容生成二维码，回车后生成"
            onPressEnter={this.handleQrcode}
          />
        </Col>
        <Col span={12}>
          <QRCode value={value} size={200} />
        </Col>
      </Row>
    );
  }
}

export default Qd;
