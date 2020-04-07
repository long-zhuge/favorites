import { isUrl } from '../utils';

const menuData = [
  // {
  //   name: '放款信息管理',
  //   icon: 'pay-circle-o',
  //   path: 'info',
  //   children: [
  //     {
  //       name: '放款产品管理',
  //       path: 'loanProducts',
  //       // permission: 'prod_mgr',
  //     },
  //   ],
  // },
];

export function formatterMenuData(data = menuData, parentPath = '/') {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
    };
    if (item.children) {
      result.children = formatterMenuData(item.children, `${parentPath}${item.path}/`);
    }

    return result;
  });
}
