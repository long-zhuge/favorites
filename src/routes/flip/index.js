import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import FlipMove from 'react-flip-move';
import styles from './index.less';

export default () => {
  const [list, setList] = useState([
    {
      id: 0,
      name: 'andy',
    }, {
      id: 1,
      name: 'andy1',
    }, {
      id: 2,
      name: 'andy2',
    }, {
      id: 3,
      name: 'andy3',
    },
  ]);

  console.dir(list);

  return (
    <React.Fragment>
      <Button
        style={{ marginBottom: 6 }}
        onClick={() => {
          setList((i) => {
            return [...i, { id: i.length, name: `andy${i.length}` }];
          })
        }}
      >新增
      </Button>
      <Button
        style={{ marginBottom: 6 }}
        onClick={() => {
          const newList = list.sort(() => (0.5 - Math.random()));
          setList(JSON.parse(JSON.stringify(newList)));
        }}
      >打乱
      </Button>
      <FlipMove className={styles.wrap}>
        {list.map((item, index) => <div className={styles.item} key={item.id}>{item.name}</div>)}
      </FlipMove>
    </React.Fragment>
  );
}
