import React from 'react';
import { Icon } from 'antd';
import styles from './index.less';

export default class BgMusic extends React.PureComponent {
  state = {
    play: false,
    audioDom: null,
  };

  componentDidMount() {
    this.setState({
      audioDom: document.getElementById('bg_music_audio'),
    });
  }

  onPlay = () => {
    const { play, audioDom } = this.state;

    if (play) {
      audioDom.pause();
    } else {
      audioDom.play();
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
        <audio loop="loop" hidden id="bg_music_audio">
          <source src="./rain.mp4" type="audio/mp4" />
        </audio>
      </div>
    );
  }
}
