/*
* 约定：当 fileList 数组对象中存在 filePath 时，则该对象不进行上传
* API：{
*   initialFiles: [{  // 初始化数据
*     url: '用于将文件列表显示为 a 标签的超链接样式'，值 = filePath
*     name: 文件名，用于显示
*     uid: 唯一标示
*     filePath: 文件路径，如果存在的话，该对象不会进行上传，并在其他文件上传完毕后，一起返回
*   }],
*   size: 20, // 单个文件大小限制，单位 MB
*   nameSize: 50, // 文件名长度限制
*   url: '', // 文件上传地址
*   params: {}, // 业务需要的入参
*   btnText: '上传', // 按钮文案
*   maxFiles: 10, // 上传文件数
*   disabled: false, // 是否禁用
*   btnProps: {}, // Button 的属性控制
*   tip: // 提示信息
*   this.refs.onUpload(cb): 父组件调用的上传操作，callback 返回 列表数据
*   callback(type, file, fileList) {}, // type = { after: "点击提交文件之后，before之后触发"，remove："删除操作的回调" }
*   isPreview: bool, 是否开启预览功能。默认 = false 不开启。只有对象中存在 url 时才能进行预览
*   extraValidate: () => {}, // 失败则返回 true
* }
* */

import React from 'react';
import cx from 'classnames';
import { Upload, Button, message } from 'antd';
import { PROXY } from '../../actions';
import request from '../../utils/request';
import Preview from './Preview';
import ImgModal from './ImgModal';
import styles from './index.less';

let num = 0;

class RdUpload extends React.PureComponent {
  static Item = Preview;
  static defaultProps = {
    url: '/file/upload.json',
    isPreview: false,
    btnText: '上传',
    params: {}, // 除 files 外的入参
    callback: () => {},
    maxFiles: 10,
    disabled: false,
    btnProps: {},
    size: 20,
    nameSize: 40,
    extraValidate: () => {},
    hideRemoveBtn: false, // 是否可以删除，true 的时候会展示删除按钮
  };

  state = {
    fileList: this.props.initialFiles || [],
    previewImg: '',
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.initialFiles && nextProps.initialFiles) {
      if (this.props.initialFiles.toString() !== nextProps.initialFiles.toString()) {
        this.setState({
          fileList: nextProps.initialFiles,
        })
      }
    }
  }

  // 异步上传文件
  onUpload = (cb = () => {}) => {
    const { url, params } = this.props;
    const noUploadList = []; // 不需要上传的文件列表
    let uploadNum = 0; // 需要上传的文件数
    const formData = new FormData();
    this.state.fileList.forEach((file) => {
      if (!file.filePath || (file.toString() === '[object File]')) {
        // eslint-disable-next-line
        uploadNum ++;
        formData.append('files', file);
      } else {
        noUploadList.push(file);
      }
    });

    if (uploadNum > 0) {
      Object.keys(params).forEach(key => {
        formData.append(key, params[key]);
      });
      request({
        url,
        method: 'POST',
        body: formData,
        onSuccess: (res) => {
          const { dataObject } = res;
          cb([...noUploadList, ...dataObject]);
        },
      });
    } else {
      cb(noUploadList);
    }
  };

  onRemove = (file) => {
    this.setState((state) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    }, () => {
      const { callback } = this.props;
      callback('remove', file, this.state.fileList);
    });
  };

  beforeUpload = (file, files) => {
    num ++;
    const { maxFiles, callback, size, nameSize, extraValidate } = this.props; // 最大上传文件数
    const { fileList } = this.state;
    const nowFileLength = files.length + fileList.length;

    // 额外的校验
    if (extraValidate(file)) {
      return Promise.reject();
    }

    // 检测文件名长度
    if (file.name.length > nameSize) {
      message.error(`文件名长度(包含后缀)不能超过 ${nameSize}个字符：${file.name}`);
      return Promise.reject();
    }

    // 检测文件大小
    if ((file.size / 1048576) > size) {
      message.error(`文件大小不能超过 ${size}MB：${file.name}`);
      return Promise.reject();
    }

    // 检测单次上传文件数
    if (nowFileLength > maxFiles) {
      message.error(`最多只能上传 ${maxFiles} 个文件`);
      return Promise.reject();
    }

    this.setState(state => ({
      fileList: [...state.fileList, file],
    }), () => {
      if (num >= files.length) {
        num = 0;
        callback('after', file, this.state.fileList);
      }
    });
    return false;
  };

  render() {
    const { previewImg } = this.state;
    const { btnText, disabled, btnProps, tip, isPreview, wrapClassName, hideRemoveBtn } = this.props;

    return (
      <div
        className={cx(styles.ry_upload, wrapClassName, {
          'rd_upload_remove': hideRemoveBtn,
        })}
      >
        <Upload
          {...this.props}
          fileList={this.state.fileList}
          beforeUpload={this.beforeUpload}
          onRemove={this.onRemove}
          onPreview={isPreview && ((file) => {
            if (file.url) {
              this.imgRef.show();
              this.setState({
                previewImg: file.url,
              });
            }
          })}
        >
          <Button {...btnProps} icon="upload" disabled={disabled}>{btnText}</Button>
        </Upload>
        {tip && <div className={styles.tip}>{tip}</div>}
        <ImgModal ref={r => {this.imgRef = r}} url={previewImg} />
      </div>
    );
  }
}

// 组件初始化 files 数据，将业务数据过滤成组件可识别数据
RdUpload.initialFiles = (array = []) => {
  return array.map((item, index) => ({
    ...item,
    name: item.fileName,
    uid: index,
    // 使文件可下载，如果不需要下载功能，请把 url 字段注释掉
    url: `${PROXY}/file/download.json?filePath=${item.filePath}`,
  }));
};

RdUpload.Preview = Preview;

export default RdUpload;
