/*
* 图片鉴黄
* 逻辑：
*   0. 初始化时读取 public/model 中的 AI 数据
*   1. 先将图片转化为 base64 码
*   2. 将 img 节点导入到 nsfw model 中进行检测
* */

import React from 'react';
import { Spin } from 'antd';
import * as nsfwjs from 'nsfwjs';
import styles from './index.less';

class ChiHuang extends React.PureComponent {
  state = {
    nsfwModel: null,
    loading: false,
    base64: null,
    predictions: null,
    message: 'Ready to Classify',
  };

  componentDidMount() {
    // load model from public
    if (window.nsfwModel) {
      this.setState({
        nsfwModel: window.nsfwModel,
      });
    } else {
      this.setState({ loading: true }, () => {
        /*
        * dev：/model/
        * publish：/favorites/model/
        * */
        const hostname = location.hostname;
        const modelUrl = (hostname === 'localhost' || '127.0.0.1') ? '/model/' : '/favorites/model/';
        nsfwjs.load(modelUrl).then((model) => {
          window.nsfwModel = model;
          this.setState({
            nsfwModel: model,
            loading: false,
          });
        });
      });
    }
  }

  getPredictions = () => {
    setTimeout(() => {
      const { nsfwModel } = this.state;
      const img = document.getElementById('img');

      nsfwModel.classify(img).then((predictions) => {
        this.setState({
          predictions,
          message: `Identified as ${predictions[0].className}`,
        });
      });
    }, 60);
  };

  onChange = (e) => {
    this.reset();
    const that = this;
    const file = e.currentTarget.files[0];
    const reader = new FileReader();

    // eslint-disable-next-line
    reader.onload = (file) => {
      that.setState({
        base64: file.target.result,
      }, this.getPredictions);
    };
    reader.readAsDataURL(file);
  };

  reset = () => {
    this.setState({
      base64: null,
      predictions: null,
    });
  };

  render() {
    const { loading, base64, predictions, message } = this.state;

    return (
      <Spin size="large" spinning={loading} tip="AI 数据加载中...">
        <div className={styles.fileBox}>
          <img id="img" className={styles.img} src={base64} alt="" />
          <label className={styles.fileBtn} htmlFor="file" />
        </div>
        <input
          id="file"
          type="file"
          className="hidden"
          onChange={this.onChange}
          accept="image/gif, image/jpeg, image/png,"
        />
        <div className={styles.content}>
          <div className={styles.content_title}>{message}</div>
          {predictions && predictions.map(item => (
            <div className={styles.item} key={item.className}>
              {`${item.className} - ${(item.probability * 100).toFixed(2)}%`}
            </div>
          ))}
        </div>
      </Spin>
    );
  }
}

export default ChiHuang;
