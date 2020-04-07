/*
* 用于 Table 组件的操作栏，将操作按钮隔开
* ps：使用该组件时，请确保子元素都是 a标签，或都是 button标签
* */

import React from 'react';
import styles from './index.less';

export default (props) => {
  return (
    <div className={styles.handleBox}>{props.children}</div>
  );
}
