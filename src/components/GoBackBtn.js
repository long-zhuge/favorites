import React from 'react';
import { Button } from 'antd';

export default function GoBackBtn(props) {
  const onBack = () => {
    history.back();
  };

  return (
    <Button
      {...props}
      type="primary"
      size="small"
      icon="left"
      onClick={onBack}
      ghost
    >
      返回
    </Button>
  );
}
