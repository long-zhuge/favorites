import BasicLayout from '../layouts/BasicLayout';

// 页面
import Home from '../routes/home';
import Base64 from '../routes/base64';
import Qrcode from '../routes/qrcode';
import Xlsx from '../routes/excel';
import Love from '../routes/love';

const data = [{
  component: BasicLayout,
  layout: 'BasicLayout',
  name: '首页',
  path: '',
  children: [
    {
      name: 'home',
      path: '/favorites/index.html',
      component: Home,
    },
    {
      name: 'base64',
      path: '/favorites/base64',
      component: Base64,
    },
    {
      name: 'qrcode',
      path: '/favorites/qrcode',
      component: Qrcode,
    },
    {
      name: 'excel',
      path: '/favorites/excel',
      component: Xlsx,
    },
    {
      name: 'love',
      path: '/favorites/love',
      component: Love,
    },
  ],
}];

export default data;
