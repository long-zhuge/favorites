/*
* 图片预览的浮层组件
* API：{
*   url：图片地址
* }
* */

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, Spin } from 'antd';
import styles from './index.less';

export default forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [tip, setTip] = useState('');
  const { url } = props;

  const show = () => {
    setVisible(true);
  };

  const onLoad = () => {
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setTip('加载失败');
  };

  useImperativeHandle(ref, () => ({
    show,
  }));

  return (
    <Modal
      title={<a href={url} download>下载</a>}
      visible={visible}
      width={700}
      footer={false}
      onCancel={() => { setVisible(false) }}
    >
      <Spin spinning={loading} tip="图片加载中...">
        <img
          alt={tip}
          src={url}
          onLoad={onLoad}
          onError={onError}
          className={styles.previewImg}
        />
      </Spin>
    </Modal>
  );
})
