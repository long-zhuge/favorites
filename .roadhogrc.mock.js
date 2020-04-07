/*
* mock 数据接口
* 数据返回以及逻辑处理可以放在 ./mock 文件中进行处理。请注意命名规范
* 代理线上接口：cnpm run proxy
* */
const fs = require('fs');
const path = require('path');
import { delay } from 'roadhog-api-doc';

const proxy = {};
// 将 mockJS 进行组装
fs.readdirSync(path.join(__dirname, 'mock')).forEach(file => {
  if (file !== 'index.js') {
    const isFile = fs.statSync(path.join(__dirname, 'mock', file)).isFile();
    if (isFile) {
      const extname = path.extname(file);
      switch (extname) {
        case '.js':
          Object.assign(proxy, require(`./mock/${file}`));
          break;
        case '.json':
          Object.assign(proxy, {
            [file]: file,
          });
          break;
        default:
      }
    }
  }
});

export default delay(proxy, 1000);

