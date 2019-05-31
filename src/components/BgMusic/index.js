import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

export default class BgMusic extends React.PureComponent {
  state = {
    play: false,
  };

  componentDidMount() {}

  onPlay = () => {
    const { play } = this.state;

    if (play) {
      this.refs.audio.pause();
    } else {
      this.refs.audio.play();
    }
    this.setState({ play: !play });
  };

  render() {
    const { play } = this.state;

    return (
      <div className={styles.bg_music_wrapper} onClick={this.onPlay}>
        <Icon
          className={styles.bg_music_icon}
          type={play ? 'pause-circle' : 'play-circle'}
        />
        <audio loop="loop" hidden ref="audio">
          <source src="./rain.mp4" type="audio/mp4" />
        </audio>
      </div>
    );
  }
}
