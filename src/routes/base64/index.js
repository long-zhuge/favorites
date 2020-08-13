import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import styles from './index.less';

export default () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {}, []);

  const onChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      setLoading(true);
      uploadFile(file).then((res) => {
        setText(res);
        alert('解析成功')
      }).finally(() => {
        setLoading(false);
      })
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
      reader.onloadend = (f) => {
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
        </div>
      </div>
      <img className={styles.img} src={text} alt="" />
    </React.Fragment>
  );
}
