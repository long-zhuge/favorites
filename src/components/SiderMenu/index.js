import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'components';
import { urlToList } from '../../utils';
import { TITLE } from '../../actions';
import { formatterMenuData } from '../../common/menu';
import styles from './index.less';

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menu
 */
export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  );

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    const menuData = formatterMenuData();

    this.flatMenuKeys = getFlatMenuKeys(menuData);
    this.state = {
      openKeys: this.getDefaultCollapsedSubMenus(props),
      menus: [],
      menuData,
    };
  }

  componentWillReceiveProps(nextProps) {
    const that = this;
    const menuTimer = setTimeout(() => {
      const menus = that.getPermMenuData();
      that.setState({ menus });
      window.clearTimeout(menuTimer);
    });

    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        openKeys: this.getDefaultCollapsedSubMenus(nextProps),
      });
    }
  }

  // 权限过滤，得到过滤后的菜单数据
  getPermMenuData = () => {
    const { menuData } = this.state;
    const { permissions } = this.props;

    if (permissions) {
      return menuData.filter(item => {
        const childrens = item.children.filter(child => {
          if (!child.permission) {
            return true;
          }

          return permissions.some(per => (child.permission === per));
        });

        if (childrens.length > 0) {
          // eslint-disable-next-line
          item.children = childrens;
          return true;
        }
        return false;
      });
    }

    return [];
  };

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
  getDefaultCollapsedSubMenus(props) {
    const { location: { pathname } } = props || this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  }
  /**
   * 渲染菜单数据
   */
  getNavMenuItems = () => {
    const { menuData } = this.state;

    return menuData.map((item) => {
      const { children } = item;

      if (children && children.length > 0) {
        return (
          <Menu.SubMenu
            key={item.path}
            title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}
          >
            {children.map(sub =>
              <Menu.Item key={sub.path}><Link to={sub.link || sub.path}>{sub.name}</Link></Menu.Item>
            )}
          </Menu.SubMenu>
        );
      }

      return null;
    });
  };

  // Get the currently selected menu
  getSelectedMenuKeys = () => {
    const { location: { pathname } } = this.props;
    return getMenuMatchKeys(this.flatMenuKeys, urlToList(pathname));
  };
  isMainMenu = key => {
    const { menus } = this.state;
    return menus.some(item => key && (item.key === key || item.path === key));
  };
  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    });
  };
  render() {
    const { collapsed } = this.props;
    const { openKeys } = this.state;
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : { openKeys };
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys();
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    return (
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        width={200}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <Link to="/welcome">
            <h1>{collapsed ? <Icon type="home" /> : TITLE}</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems()}
        </Menu>
      </Layout.Sider>
    );
  }
}
