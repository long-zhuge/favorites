import React, { useState, useRef } from 'react';
import { Icon } from 'antd';
import styles from './index.less';

export default () => {
  const audioRef = useRef();
  const [play, setPlay] = useState(false);

  const onPlay = () => {
    if (play) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!play);
  };

  return (
    <div className={styles.bg_music_wrapper} onClick={onPlay}>
      <Icon
        className={styles.bg_music_icon}
        type={play ? 'pause-circle' : 'play-circle'}
      />
      <audio
        loop="loop"
        ref={audioRef}
        src="./rain.mp4"
      >
        <track kind="captions" />
      </audio>
    </div>
  );
}
