/*
* 约定：fileList 和 RdUpload 的 initialFiles 的格式相同
* API: {
*  fileList: [],
* }
* */

import React from 'react';
import ImgModal from './ImgModal';

export default class Preview extends React.PureComponent {
  static defaultProps = {
    fileList: [],
  };

  state = {
    previewImg: '',
  };

  renderFileList = () => {
    const { fileList } = this.props;

    return fileList.map((item, index) => (
      <React.Fragment>
        <a onClick={() => this.showModal(item)}>{item.name}</a>
        {fileList.length > (index + 1) && '、'}
      </React.Fragment>
    ))
  };

  showModal = (record) => {
    this.imgRef.show();
    this.setState({
      previewImg: record.url,
    });
  };

  render() {
    const { previewImg } = this.state;

    return (
      <React.Fragment>
        {this.renderFileList()}
        <ImgModal ref={r => {this.imgRef = r}} url={previewImg} />
      </React.Fragment>
    );
  }
}
