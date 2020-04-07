/*
* 简单封装 Button，减少重复样式。
* */

import React from 'react';
import { Button } from 'antd';

function Btn({children, ...props}) {
  const {
    name = '新增',
    type = 'primary',
  } = props;

  return (
    <Button
      {...props}
      type={type}
      style={{
        marginBottom: 12,
        marginRight: 12,
        ...props.style,
      }}
    >
      {children || name}
    </Button>
  );
}

export default Btn;
