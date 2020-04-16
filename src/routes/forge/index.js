import React, { useState } from 'react';
import { Button, Input } from 'antd';

export default () => {
  const [text, setText] = useState(null);
  const [forge, setForge] = useState('');

  return (
    <React.Fragment>
      <Input.TextArea
        placeholder="请输入需要加密的内容"
        onChange={({ target }) => {
          setText(target.value);
        }}
      />
      <div>加密后：{forge}</div>
      <div className="submit_div">
        <Button
          type="primary"
          onClick={() => {
            const md = window.forge.md.sha256.create();
            md.update(text);
            setForge(md.digest().toHex());
          }}
        >
          加密
        </Button>
      </div>
    </React.Fragment>
  );
}
