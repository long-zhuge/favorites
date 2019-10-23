/*
* 高级编辑：上传logo
* 返回 {
*   img: 图片标签
*   name: 文件名
* }
* TODO: 未开发完全
* */

import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import styles from './SeniorEdit.less';

export default (props) => {
  const {
    maxSize = 200,
    callback = () => {},
  } = props;
  const [visible, setVisible] = useState(false);
  const [file, setFile] = useState(null);

  const onChange = (e) => {
    e.stopPropagation(); // 冒泡
    e.preventDefault(); // 捕获

    const img = new Image(); // 初始化一个 Image 对象
    const fileObj = e.currentTarget.files[0]; // 获取文件对象
    img.src = window.URL.createObjectURL(fileObj); // 将文件对象赋值给 img
    const { size } = fileObj;

    if ((size / 1024) > maxSize) {
      message.error(`图片不得超过：${maxSize}KB`);
      return;
    }

    setFile({ img, name: fileObj.name });
    // 清除 input=file 的value。否则同一个文件不能二次选择。
    e.target.value = '';
  };

  // 浮层关闭
  const onCancel = () => {
    setVisible(false);
    setFile(null);
  };

  // 浮层确定
  const onOk = () => {
    callback(file.img);
    onCancel();
  };

  return (
    <React.Fragment>
      <div className={styles.senior} onClick={() => { setVisible(true); }}>高级编辑</div>
      <Modal
        width={400}
        onOk={onOk}
        visible={visible}
        onCancel={onCancel}
        maskClosable={false}
        okButtonProps={{ disabled: !file }}
      >
        <Button className={styles.btn}><label className={styles.label} htmlFor="file">LOGO</label></Button>
        <span className={styles.fileName}>{file && file.name}</span>
        <input id="file" className="hidden" type="file" accept="image/*" onChange={onChange} />
      </Modal>
    </React.Fragment>
  );
};
