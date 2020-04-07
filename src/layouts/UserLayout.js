import React from 'react';
import { router } from 'dva';
import DocumentTitle from 'react-document-title';
import styles from './UserLayout.less';
import { getRoutes } from '../utils';
import { TITLE } from '../actions';
// import LayoutFooter from './LayoutFooter';

const { Redirect, Switch, Route } = router;

class UserLayout extends React.PureComponent {
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = TITLE;
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} - ${TITLE}`;
    }
    return title;
  }
  render() {
    const { routerData, match } = this.props;
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Switch>
              {getRoutes(match.path, routerData).map(item => (
                <Route
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                />
              ))}
              <Redirect exact from="/user" to="/user/login" />
            </Switch>
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

export default UserLayout;
