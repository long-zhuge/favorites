import React from 'react';
import { router, routerRedux } from 'dva';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { getRouterData } from './common/router';

const { Route, Switch } = router;
const { ConnectedRouter } = routerRedux;

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/user'].component;
  const BasicLayout = routerData['/'].component;
  return (
    <ConfigProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/user" component={UserLayout} />
          <Route path="/" component={BasicLayout} />
        </Switch>
      </ConnectedRouter>
    </ConfigProvider>
  );
}

export default RouterConfig;
