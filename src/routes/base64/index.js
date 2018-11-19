import React from 'react';
import { connect } from 'dva';
import { Button, message } from 'antd';
import styles from './index.less';

class Base64 extends React.Component {
  state = {
    text: '',
  };

  onChange = (e) => {
    const that = this;
    const file = e.currentTarget.files[0];
    const reader = new FileReader();

    // eslint-disable-next-line
    reader.onload = function(file) {
      that.setState({
        text: file.target.result,
      });
    };
    reader.readAsDataURL(file);
  };

  onCopy = () => {
    document.addEventListener('copy', this.copyEvent);

    try {
      const msg = document.execCommand('copy');
      document.removeEventListener('copy', this.copyEvent);

      if (msg) {
        message.success('复制成功');
        return;
      }
      message.error('复制失败，请重试');
    } catch (err) {
      message.error('unable to copy', err);
    }
  };

  copyEvent = (e) => {
    const { text } = this.state;
    e.clipboardData.setData('text/plain', text);
    e.preventDefault();
  };

  render() {
    const { text } = this.state;

    return (
      <React.Fragment>
        <div className={styles.base64_submit}>
          <div>
            <Button>
              {
                // eslint-disable-next-line
                <label htmlFor="file">提交转化</label>
              }
            </Button>
            &nbsp;&nbsp;
            <Button onClick={this.onCopy} disabled={text === ''}>复制</Button>
            <input id="file" className="hidden" type="file" onChange={this.onChange} />
          </div>
          <div>功能介绍: 可以将你的文件转化为 base64 码。</div>
          <div>PS: 转化文件需要消耗一些时间，并造成页面短暂卡死。文件越大，持续时间越长！！！</div>
        </div>
        <div className={styles.base64_text}>
          { text }
        </div>
      </React.Fragment>
    );
  }
}

// 关联 model
export default connect()(Base64);
