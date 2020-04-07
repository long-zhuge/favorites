import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import styles from './index.less';

export default () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(false);

  useEffect(() => {}, []);

  const onChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      if ((file.size / 1048576) > 2) {
        message.error(`文件大小不能超过 2MB：${file.name}`);
        return;
      }

      setLoading(true);
      uploadFile(file).then((res) => {
        setText(res);
        setLoading(false);
      });
    }
  };

  const onCopy = () => {
    document.addEventListener('copy', copyEvent);

    try {
      const msg = document.execCommand('copy');
      document.removeEventListener('copy', copyEvent);

      if (msg) {
        message.success('复制成功');
        return;
      }
      message.error('复制失败，请重试');
    } catch (err) {
      message.error('unable to copy', err);
    }
  };

  const copyEvent = (e) => {
    e.clipboardData.setData('text/plain', text);
    e.preventDefault();
  };

  const uploadFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (f) => {
        resolve(f.target.result);
      };
      reader.readAsDataURL(file);
    })
  };

  return (
    <React.Fragment>
      <div className={styles.base64_submit}>
        <div>
          <Button loading={loading}><label htmlFor="file">提交转化</label></Button>
          &nbsp;&nbsp;
          <Button onClick={onCopy} disabled={text === ''}>复制</Button>
          <input id="file" className="hidden" type="file" onChange={onChange} />
        </div>
        <div className={styles.tip}>
          功能介绍: 可以将你的文件转化为 base64 码。<br />
          PS: 转化文件需要消耗一些时间，并造成页面短暂卡死。文件越大，持续时间越长！！！
        </div>
      </div>
      <div className={styles.base64_text}>
        { text }
      </div>
    </React.Fragment>
  );
}
