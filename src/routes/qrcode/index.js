import React from 'react';
import { Input, Row, Col, Button, Tag } from 'antd';
import QRCode from 'qrcode.react';
import styles from './index.less';

const QR_CODE = 'qrcode';

class Qd extends React.PureComponent {
  constructor() {
    super();

    const history = JSON.parse(localStorage.getItem(QR_CODE)) || [];

    this.state = {
      value: '',
      src: '',
      history,
    };
  }

  // 生成二维码
  create = () => {
    const { value, history } = this.state;
    const obj = {
      src: this.convertCanvasToImage(),
    };

    if (!history.includes(value)) {
      obj.history = [...history, value];
    }

    this.setState(obj, () => {
      this.setLocalStorage();
    });
  };

  // 将值写入到 state 中
  handleQrcode = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };

  // 将 canvas 转化为 img 图片流
  convertCanvasToImage = () => {
    const canvas = document.getElementById('canvas');

    return canvas.toDataURL('image/png');
  };

  // 渲染历史记录
  renderTag = () => {
    const { history } = this.state;

    return history.map(item => (
      <Tag
        closable
        key={item}
        onClick={() => this.onClick(item)}
        onClose={() => this.onClose(item)}
      >
        {item}
      </Tag>
    ));
  };

  // 删除历史记录
  onClose = (key) => {
    const { history } = this.state;
    const newData = history.filter(item => item !== key);

    this.setState({ history: newData }, () => {
      this.setLocalStorage();
    });
  };

  // 使用历史记录的信息
  onClick = async (value) => {
    await this.setState({ value });
    await this.setState({ src: this.convertCanvasToImage() });
  };

  // 设置缓存
  setLocalStorage = () => {
    localStorage.setItem(QR_CODE, JSON.stringify(this.state.history));
  };

  render() {
    const { value, src } = this.state;

    return (
      <React.Fragment>
        <Row>
          <Col span={12}>
            <Input.TextArea
              value={value}
              placeholder="请输入内容"
              className={styles.textarea}
              onChange={this.handleQrcode}
            />
            <div className={styles.btn_box}>
              <Button disabled={value === ''} size="small" onClick={this.create}>生成</Button>
            </div>
          </Col>
          <Col span={12}>
            <img className={styles.img} src={src} alt="" />
            <QRCode className="hidden" id="canvas" value={value} size={200} />
          </Col>
        </Row>
        <div className={styles.history}>
          历史记录：{this.renderTag()}
        </div>
      </React.Fragment>
    );
  }
}

export default Qd;
