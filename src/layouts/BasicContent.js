import React from 'react';
import { router } from 'dva';
import { Layout } from 'antd';
import ErrorBoundary from '../components/ErrorBoundary';
import Exception404 from '../routes/exception/404';
import Exception403 from '../routes/exception/403';
import styles from './BasicContent.less';
import { getRoutes } from '../utils';

const { Route, Switch } = router;

export default function BasicContent(props) {
  const { match, routerData, permissions } = props;
  const { pathname } = window.location;
  const renderRoute = () => {
    const routers = getRoutes(match.path, routerData).filter(item => item.path === pathname)[0];
    // 当 router 存在时，需要过滤权限，并覆盖到对象中。
    // 无权限时，则展示 403
    if (routers) {
      const router403 = { ...routers, component: Exception403 };
      // 当对象没有 permissions 属性时，表示该页面为白名单
      if (!routers.permissions) {
        return routers;
      }
      // 当为请求到用户数据时，则暂时展示空白页，解决页面手动刷新时先出现 403或者404，再渲染成正常页面的跳动问题
      if (!permissions) {
        return {
          exact: false,
          path: pathname,
          component: null,
        };
      }
      // 当该用户有权限码时，需要过滤权限码，并进行覆盖
      if (permissions.length > 0) {
        const per = routers.permissions.filter(item => permissions.includes(item));
        return per.length > 0 ? {...routers, permissions: per} : router403;
      }

      return router403;
    }

    // 无页面时，则展示 404
    return {
      exact: false,
      path: pathname,
      component:  Exception404,
    };
  };
  const routerItem = renderRoute();

  return (
    <Layout.Content className={styles.container}>
      <div className={styles.content}>
        <ErrorBoundary>
          <Switch>
            <Route {...routerItem} />
          </Switch>
        </ErrorBoundary>
      </div>
    </Layout.Content>
  );
}
