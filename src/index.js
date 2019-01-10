import dva from 'dva';
import browserHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'moment/locale/zh-cn';
import models from './models';
import './polyfill';
import './index.less';

console.log(1);

// 1. Initialize
const app = dva({
  history: browserHistory(),
});

// 2. Plugins
app.use(createLoading()); // 全局loading

// 3. Model move to router
models.forEach((m) => {
  app.model(m);
});

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

// 将 app 挂载到 window 对象上，方便其他应用调用
window.App = app;
// eslint-disable-next-line
window.App_store = app._store;
