/* eslint-disable */

import React from 'react';
import { connect } from 'dva';
import { Button, message } from 'antd';
import jsonToExcel from './jsonToExcel';
import styles from '../base64/index.less';

function removeAllSpace(str = '') {
  return str.replace(/\r\n/g, '').replace(/\n/g, '').replace(/\s/g, '');
}

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
        const textToJson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

        // 遍历去除空格和回车符，主要是字段4中
        textToJson.forEach(item => {
          item['字段4'] = removeAllSpace(item['字段4']);
        });

        that.setState({ text: JSON.stringify(textToJson) });
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

  // 清洗数据逻辑
  download = () => {
    const { text } = this.state;
    const data = JSON.parse(text);
    const filterData = [];

    data.forEach(item => {
      // 当存在标题时
      if (item['字段1'].length > 0) {
        // 清洗字段4
        const field4 = item['字段4']
          .replace('发布日期：', ',发布日期：')
          .replace('失效/废止日期：', ',失效/废止日期：')
          .replace('发布文号：', ',发布文号：')
          .replace('实施日期：', ',实施日期：')
          .replace('状态：', ',状态：')
          .replace('备注：', ',备注：');
        const arr = field4.split(',');


        // 组装数据
        filterData.push({
          title: item['字段1'],
          source: item['字段2'],
          sourceUrl: item['字段2_link'],
          updateDate: item['字段2_link'].length > 0 ? item['字段3'] : item['字段7'],
          place: item['字段6'],
          placeType: item['字段6'].includes('国家') ? 1 : 0,
          publishUnit: arr[0].replace('发布单位：', ''),
          publishDate: arr[1].replace('发布日期：', ''),
          invalidDate: arr[2].replace('失效/废止日期：', ''),
          publishNumber: arr[3].replace('发布文号：', ''),
          implementDate: arr[4].replace('实施日期：', ''),
          status: arr[5].replace('状态：', ''),
          remarks: arr[6].replace('备注：', ''),
        });
      }
    });

    const excel = jsonToExcel(filterData);

    if (excel) {
      const a = document.createElement("a");
      a.href = `data:application/vnd.ms-excel;charset=utf-8,${encodeURIComponent(excel)}`;
      a.download = '法律法规.xls';
      a.click();
      a.remove();
    } else {
      alert('无数据可转化');
    }
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
            &nbsp;&nbsp;
            <Button onClick={this.download} disabled={text === ''}>下载excel</Button>
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
