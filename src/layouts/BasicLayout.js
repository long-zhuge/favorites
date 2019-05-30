import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { Route } from 'dva/router';
import { GLOBAL_TITLE } from '../actions';
import GlobalHeader from './GlobalHeader';
import ErrorBoundary from '../components/ErrorBoundary';
import TheDay from '../components/TheDay';
import BgMusic from '../components/BgMusic';
import styles from './BasicLayout.less';

class BasicLayout extends React.PureComponent {
  render() {
    const { routerItem } = this.props;

    const layout = (
      <Layout className={styles.box}>
        <BgMusic />
        <GlobalHeader routerItem={routerItem} />
        <TheDay />
        <ErrorBoundary>
          <Layout.Content className={styles.global_content}>
            <Route
              exact={routerItem.exact}
              path={routerItem.path}
              component={routerItem.component}
            />
          </Layout.Content>
        </ErrorBoundary>
      </Layout>
    );

    return (
      <DocumentTitle title={GLOBAL_TITLE}>
        <div>{layout}</div>
      </DocumentTitle>
    );
  }
}

// 监听属性，建立组件和数据的映射关系
function mapStateToProps(state) {
  const { routerItem } = state.GLOBAL;

  return { routerItem };
}

export default connect(mapStateToProps)(BasicLayout);
