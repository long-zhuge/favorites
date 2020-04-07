import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import SignaturePad from 'signature_pad';
import { toast } from 'utils';
import styles from './index.less';


export default () => {
  const [signature, setSignature] = useState();
  const [data, setData] = useState(null);

  useEffect(() => {
    const canvas = document.getElementById("signature_canvas");
    const signaturePad = new SignaturePad(canvas, {
      minWidth: 2,
      maxWidth: 2,
      // penColor: 'rgb(66, 133, 244)',
    });
    setSignature(signaturePad);
  }, []);

  const save = () => {
    if (signature.isEmpty()) {
      toast({
        type: 'error',
        text: '请先签名',
      })
    } else {
      setData(signature.toDataURL());
    }
  };

  const clear = () => {
    signature.clear();
  };

  return (
    <React.Fragment>
      <canvas id="signature_canvas" width="500" height="250" className={styles.canvas} />
      <div className="submit_div">
        <Button onClick={clear}>清除</Button>
        <Button type="primary" onClick={save}>生成签名</Button>
      </div>
      {data && (
        <div className={styles.box}>
          <div>已生成图片，可右键点击保存到本地</div>
          <img src={data} alt="" className={styles.img} />
        </div>
      )}
    </React.Fragment>
  );
}
