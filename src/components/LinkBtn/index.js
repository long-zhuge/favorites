import React from 'react';
import cx from 'classnames';
import styles from './index.less';

function LinkBtn({ className, children, ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={cx(styles.normal, className)}
    >
      {children}
    </button>
  );
}

export default LinkBtn;
