import React, { useState, useEffect } from 'react';
import { Input, Button, Tag } from 'antd';
import QRCode from 'qrcode.react';
import styles from './index.less';

const QR_CODE = 'qrcode';

export default () => {
  const [value, setValue] = useState('');
  const [src, setSrc] = useState('');
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem(QR_CODE)) || []);

  // 当历史数据发生变化时，就进行存储
  useEffect(() => {
    localStorage.setItem(QR_CODE, JSON.stringify(history));
  },[history]);

  // 将值写入到 state 中
  const handleQrcode = (e) => {
    const v = e.target.value;

    // 如果输入框为空时，则清空二维码图片
    if (v === '') {
      setSrc('');
    }
    setValue(v);
  };

  // 生成二维码
  const create = async () => {
    setSrc(convertCanvasToImage());

    if (!history.includes(value)) {
      const h = [...history, value];
      setHistory(h);
    }
  };

  // 使用历史记录的信息
  const onClick = async (v) => {
    await setValue(v);
    await setSrc(convertCanvasToImage());
  };

  // 删除历史记录
  const onClose = (key) => {
    const newData = history.filter(item => item !== key);
    setHistory(newData);
  };

  // 将 canvas 转化为 img 图片流
  const convertCanvasToImage = () => {
    const canvas = document.getElementById('canvas');

    return canvas.toDataURL('image/png');
  };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.input}>
          <Input.TextArea
            value={value}
            placeholder="请输入内容"
            className={styles.textarea}
            onChange={handleQrcode}
          />
          <div className={styles.btn_box}>
            <Button disabled={value === ''} type="primary" onClick={create}>生成</Button>
          </div>
        </div>
        <div className={styles.output}>
          {src ?
            <img className={styles.img} src={src} /> :
            <div className={styles.noImg}>此处生成二维码</div>
          }
        </div>
      </div>
      <div className={styles.history}>
        历史记录：
        {history.map(item => (
          <Tag
            closable
            key={item}
            onClick={() => onClick(item)}
            onClose={() => onClose(item)}
          >
            {item}
          </Tag>
        ))}
      </div>
      <QRCode className="hidden" id="canvas" value={value} size={200} />
    </React.Fragment>
  );
}
