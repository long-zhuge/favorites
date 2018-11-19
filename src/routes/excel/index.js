/* eslint-disable */

import React from 'react';
import { connect } from 'dva';
import { Button, message } from 'antd';
import styles from '../base64/index.less';

class Xlsx extends React.Component {
  state = {
    text: '',
  };

  onChange = (e) => {
    const that = this;
    const file = e.currentTarget.files[0];
    const { name } = file;

    if (name.indexOf('.xlsx') > 0) {
      let wb = ''; // 读取完成的数据
      const rABS = false; // 是否将文件读取为二进制字符串
      const reader = new FileReader();

      reader.onload = function(e) {
        const data = e.target.result;
        if (rABS) {
          wb = XLSX.read(btoa(that.fixdata(data)), {
            type: 'base64',
          });
        } else {
          wb = XLSX.read(data, {
            type: 'binary',
          });
        }
        // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        // wb.Sheets[Sheet名]获取第一个Sheet的数据
        that.setState({
          // TODO: 可以将多个 Sheet 进行分离
          text: JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])),
        });
      };
      if (rABS) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsBinaryString(file);
      }

      return;
    }

    message.error('文件必须为 .xlsx');
  };

  fixdata = (data) => {
    let o = '';
    let l = 0;
    let w = 10240;

    for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
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
          <div>功能介绍：可将 excel 文件序列化成 JSON 格式数据。但只能转化第一个 sheet，如果需要，可将其他 sheet 移动至第一个后，再进行转化。</div>
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
export default connect()(Xlsx);
