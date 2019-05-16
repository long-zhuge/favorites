import React from 'react';
import styles from './index.less';

// const syntaxHighlight = (json) => {
//   json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
//   return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
//     var cls = 'number';
//     if (/^"/.test(match)) {
//       if (/:$/.test(match)) {
//         cls = 'key';
//       } else {
//         cls = 'string';
//       }
//     } else if (/true|false/.test(match)) {
//       cls = 'boolean';
//     } else if (/null/.test(match)) {
//       cls = 'null';
//     }
//     return '<span class="' + cls + '">' + match + '</span>';
//   });
// }

export default class Demo extends React.PureComponent {
  state = {
    content: '',
  };

  componentDidMount() {}

  onChange = (e) => {
    const value = e.target.value;

    if (value && value !== '') {
      try {
        const json = JSON.parse(value);
        this.setState({ content: JSON.stringify(json, null, 2) });
      } catch (e) {
        this.setState({ content: <span style={{ color: 'red' }}>{e.message}</span> });
      }
    } else {
      this.setState({ content: '' });
    }
  };

  render() {
    const { content } = this.state;

    return (
      <div className={styles.box}>
        <div className={styles.left}>
          <textarea placeholder="在此输入json字符串..." onChange={this.onChange} />
        </div>
        {/*<div className={styles.item} dangerouslySetInnerHTML={{ __html: content }} />*/}
        <div className={styles.item}>
          <pre><code id="json">{content}</code></pre>
        </div>
      </div>
    );
  }
}
