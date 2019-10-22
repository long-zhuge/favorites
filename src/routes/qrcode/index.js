/*
* TODO: 增加 logo 功能，45*45大小，利用 canvas 将两张图片进行合成。
* */

import React from 'react';
import { Input, Button, Tag } from 'antd';
import QRCode from 'qrcode.react';
import SeniorEdit from './components/SeniorEdit';
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

    // 如果输入框为空时，则清空二维码图片
    if (value === '') {
      this.setState({ src: '' });
    }
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
        <div className={styles.container}>
          <div className={styles.input}>
            <SeniorEdit />
            <Input.TextArea
              value={value}
              placeholder="请输入内容"
              className={styles.textarea}
              onChange={this.handleQrcode}
            />
            <div className={styles.btn_box}>
              <Button disabled={value === ''} type="primary" onClick={this.create}>生成</Button>
            </div>
          </div>
          <div className={styles.output}>
            {src ?
              <img className={styles.img} src={src} /> :
              <div className={styles.noImg}>此处生成二维码</div>
            }
          </div>
        </div>
        <div className={styles.history}>
          历史记录：{this.renderTag()}
        </div>
        <QRCode className="hidden" id="canvas" value={value} size={200} />
      </React.Fragment>
    );
  }
}

export default Qd;
