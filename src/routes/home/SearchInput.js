import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import cloneDeep from 'lodash/cloneDeep'

export default (props) => {
  const { dataSource = [], callback = () => {} } = props;

  const onSearch = (e) => {
    const { value } = e.target;
    const data = cloneDeep(dataSource);
    const reg = new RegExp(value, 'gi');

    if (value.trim() !== '') {
      if (value === '19910605') {
        // 写情书的地方
        return;
      }

      const arr = [];
      data.forEach((item) => {
        const { title, introduce } = item;

        if (reg.test(title) || reg.test(introduce)) {
          const obj = {
            ...item,
            title: title.replace(reg, `<span style="color:#ff6c00;">${value}</span>`),
            introduce: introduce.replace(reg, `<span style="color:#ff6c00;">${value}</span>`),
          };

          arr.push(obj);
        }
      });

      callback(arr);
    } else {
      callback(data);
    }
  };

  return (
    <Input.Search
      style={{ width: 200 }}
      placeholder="同学，来搜一发"
      onInput={onSearch}
    />
  );
}
