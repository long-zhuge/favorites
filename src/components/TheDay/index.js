/* eslint-disable */
/*
* 显示当前日期为本年度的第几天，并显示进度条
* */

import React from 'react';
import moment from 'moment';
import styles from './index.less';

class TheDay extends React.Component {
  state = {
    title: '',
    progress: 0,
  };

  componentDidMount() {
    const _this = this;
    _this.setDays();

    window.setInterval(() => {
      _this.setDays();
    }, 60 * 60 * 1000);
  }

  setDays = () => {
    const nowDate = moment(new Date()).format('YYYY-MM-DD');
    const { days, totalDays } = this.getDays(nowDate);
    const progress = ((days / totalDays) * 100).toFixed(2);
    const week = Math.ceil(days / 7);

    this.setState({
      title: `${nowDate}，第 ${days} 天，第 ${week} 周，全年已走完 ${progress}% 。`,
      progress,
    });
  };

  // 获取今天是当年的第几天
  getDayNumber = (nowDate, isTotal) => {
    const arr  = nowDate.split('-');
    const year = +arr[0];
    const month = isTotal ? 12 : +arr[1];
    let day = isTotal ? 31 : +arr[2];

    switch(month - 1) {
      case 11:
        day += 31;
      case 10:
        day += 30;
      case 9:
        day += 30;
      case 8:
        day += 31;
      case 7:
        day += 31;
      case 6:
        day += 30;
      case 5:
        day += 31;
      case 4:
        day += 30;
      case 3:
        day += 31;
      case 2:
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          day += 29;
        } else {
          day += 28;
        }
      case 1:
        day += 31;
      default:
        break;
    }

    return day;
  };

  // 获取需要展示的数据
  getDays = (nowDate) => {
    return {
      days: this.getDayNumber(nowDate),
      totalDays: this.getDayNumber(nowDate, true),
    };
  };

  render() {
    const { progress, title } = this.state;

    return (
      <div className={styles.progress_inner}>
        <div className={styles.progress_title}>{title}</div>
        <div className={styles.progress_bg} style={{ width: `${progress}%` }} />
      </div>
    );
  }
}

export default TheDay;
