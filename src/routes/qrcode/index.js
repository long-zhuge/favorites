import React from 'react';
import { Input } from 'antd';
import QRCode from 'qrcode.react';
import styles from './index.less';

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
      <React.Fragment>
        <Input
          style={{ width: 200 }}
          placeholder="输入内容生成二维码"
          onPressEnter={this.handleQrcode}
        />
        <div className={styles.qrcode}>
          <QRCode value={value} size={200} />
        </div>
      </React.Fragment>
    );
  }
}

export default Qd;
