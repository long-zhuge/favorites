/*
* 通过 H5 的 navigator 调用设备摄像头，再通过 video 进行展示
* 注意：当执行过 startMedia 的方法后。会导致 components/BgMusic 报错，报错如下
*   Uncaught (in promise) DOMException 【待解决】
* */

import React from 'react';

export default class Demo extends React.PureComponent {
  state = {
    stream: null,
    videoDom: null,
  };

  componentDidMount() {
    this.setState({
      videoDom: document.getElementById('video'),
    }, () => {
      this.startMedia();
    });
  }

  componentWillUnmount() {
    this.close();
  }

  startMedia = () => {
    const constraints = {
      // audio: false,
      video: true,
    };
    let userMedia = null;

    if (navigator.mediaDevices.getUserMedia) {
      // 最新标准API
      userMedia = navigator.mediaDevices.getUserMedia(constraints);
    } else if (navigator.webkitGetUserMedia) {
      // webkit内核浏览器
      userMedia = navigator.webkitGetUserMedia(constraints);
    } else if (navigator.mozGetUserMedia) {
      // Firefox浏览器
      userMedia = navigator.mozGetUserMedia(constraints);
    } else if (navigator.getUserMedia) {
      // 旧版API
      userMedia = navigator.getUserMedia(constraints);
    }
    userMedia.then(this.handleSuccess).catch(this.handleError);
  };

  handleSuccess = (stream) => {
    const { videoDom } = this.state;
    // const CompatibleURL = window.URL || window.webkitURL;
    // videoDom.src = CompatibleURL.createObjectURL(stream);
    videoDom.srcObject = stream;
    videoDom.play();

    this.setState({ stream });
  };

  handleError = (error) => {
    console.error('navigator.getUserMedia error: ', error);
  };

  open = () => {
    this.startMedia();
  };

  close = () => {
    const { stream } = this.state;

    stream.getTracks().forEach((track) => {
      track.stop();
    });
  };

  render() {
    return (
      <React.Fragment>
        <video id="video" style={{ width: 480, height: 320 }} />
        <button onClick={this.open}>打开</button>
        <button onClick={this.close}>关闭</button>
      </React.Fragment>
    );
  }
}
