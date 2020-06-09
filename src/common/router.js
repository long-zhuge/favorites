import { createElement } from 'react';
import { dynamic } from 'dva';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

export const getRouterData = app => {
  return {
    '/': {
      component: dynamicWrapper(app, ['user', 'global'], () => import('../layouts/BasicLayout')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/exception/403')),
      name: '无权限访问',
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/exception/404')),
      name: '该页面不存在',
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/exception/500')),
      name: '服务升级中',
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/user/Login')),
      name: '登录',
    },
    // 业务路由
    '/home': {
      component: dynamicWrapper(app, [], () => import('../routes/home')),
      name: 'home',
    },
    '/base64': {
      component: dynamicWrapper(app, [], () => import('../routes/base64')),
      name: 'base64',
    },
    '/qrcode': {
      component: dynamicWrapper(app, [], () => import('../routes/qrcode')),
      name: 'qrcode',
    },
    '/pdf': {
      component: dynamicWrapper(app, [], () => import('../routes/pdf')),
      name: 'pdf',
    },
    '/signature': {
      component: dynamicWrapper(app, [], () => import('../routes/signature')),
      name: 'signature',
    },
    '/forge': {
      component: dynamicWrapper(app, [], () => import('../routes/forge')),
      name: 'forge',
    },
    '/flip': {
      component: dynamicWrapper(app, [], () => import('../routes/flip')),
      name: 'flip',
    },
  };
};
