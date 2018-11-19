/*
* 将当前目录下所有的 model 整合到一起
* */

const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');

const models = [];
for (let i = 0; i < keys.length; i += 1) {
  models.push(context(keys[i]));
}

export default models;
