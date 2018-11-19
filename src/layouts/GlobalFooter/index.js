/*
* 全局页脚部分
* */

import React from 'react';
import styles from './index.less';

function GlobalFooter() {
  return (
    <div className={styles.globalFooter}>
      友情提示：部分链接涉及内部信息，请谨慎使用，切记不要外传，感谢你的使用！
    </div>
  );
}

export default GlobalFooter;
