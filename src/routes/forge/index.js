import React, { useState, useEffect, useRef } from 'react';
import { Input, Button } from 'antd';
import { genNonDuplicateID, toast } from 'utils';
import CryptoJS from "crypto-js";

export default () => {
  const [secretKey, setSecretKey] = useState(''); // 秘钥
  const [text, setText] = useState(''); // 加密前
  const [secretText, setSecretText] = useState(''); // 加密后

  const autoSecretKey = () => {
    setSecretKey(genNonDuplicateID(36));
  };

  // 加密
  const onEncrypt = () => {
    if (secretKey && text) {
      const data = CryptoJS.AES.encrypt(text, secretKey).toString();
      setSecretText(data);
    } else {
      toast({
        type: 'warning',
        text: '请输入秘钥和需要加密的内容',
      });
    }
  };

  // 解密
  const onDecrypt = () => {
    if (secretKey && secretText) {
      const data = CryptoJS.AES.decrypt(secretText, secretKey).toString(CryptoJS.enc.Utf8);
      setText(data);
    } else {
      toast({
        type: 'warning',
        text: '请输入秘钥和密文',
      });
    }
  };

  return (
    <React.Fragment>
      <Input.TextArea
        value={secretKey}
        placeholder="请输入秘钥"
        onChange={({ target }) => { setSecretKey(target.value) }}
      />
      <Button style={{ margin: '6px 0' }} onClick={autoSecretKey}>自动生成秘钥</Button>
      <Input.TextArea
        value={text}
        placeholder="请输入需要加密的内容"
        onChange={({ target }) => { setText(target.value) }}
      />
      <div style={{ margin: '6px 0' }} />
      <Input.TextArea
        value={secretText}
        placeholder="加密后的内容"
        onChange={({ target }) => { setSecretText(target.value) }}
      />
      <div style={{ margin: '6px 0' }} />
      <Button style={{ marginRight: 6 }} onClick={onEncrypt} type="primary">加密</Button>
      <Button onClick={onDecrypt} type="primary">解密</Button>
    </React.Fragment>
  );
}
