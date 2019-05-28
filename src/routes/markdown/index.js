import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
// import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import styles from './index.less';

export default class Demo extends React.PureComponent {
  state = {
    content: '',
  };

  onChange = (e) => {
    const value = e.target.value;

    this.setState({ content: value });
  };

  render() {
    const { content } = this.state;

    return (
      <div className={styles.box}>
        <div className={styles.left}>
          <textarea onChange={this.onChange} autoFocus />
        </div>
        <div className={styles.right}>
          <ReactMarkdown
            source={content}
            escapeHtml={false}
          />
        </div>
      </div>
    );
  }
}
