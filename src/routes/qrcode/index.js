import React from 'react';
import { Input, Row, Col } from 'antd';
import QRCode from 'qrcode.react';
import styles from './index.less';

class Qd extends React.Component {
  state = {
    value: '',
    src: '',
  };

  componentDidMount() {
    this.setState({ src: this.convertCanvasToImage() });
  }

  handleQrcode = (e) => {
    const { value } = e.target;

    this.setState({ value }, () => {
      this.setState({ src: this.convertCanvasToImage() });
    });
  };

  // 将 canvas 转化为 img 图片流
  convertCanvasToImage = () => {
    const canvas = document.getElementById('canvas');

    return canvas.toDataURL('image/png');
  };

  render() {
    const { value, src } = this.state;

    return (
      <Row>
        <Col span={12}>
          <Input.TextArea
            style={{ width: '80%', height: 200 }}
            placeholder="输入内容生成二维码，回车后生成"
            onPressEnter={this.handleQrcode}
          />
        </Col>
        <Col span={12}>
          <img className={styles.img} src={src} alt="" />
          <QRCode className="hidden" id="canvas" value={value} size={200} />
        </Col>
      </Row>
    );
  }
}

export default Qd;
