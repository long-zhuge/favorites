import React from 'react';
import styles from './index.less';

function LayoutFooter() {
  return (
    <div className={styles.box}>
      <a
        className={styles.link}
        target="_blank"
        rel="noopener noreferrer"
        href="https://beian.miit.gov.cn"
      >
        浙ICP备20007224号
      </a>
    </div>
  );
}

export default LayoutFooter;
