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
      path: 'home',
      component: Home,
    },
    {
      name: 'base64',
      path: 'base64',
      component: Base64,
    },
    {
      name: 'qrcode',
      path: 'qrcode',
      component: Qrcode,
    },
    {
      name: 'excel',
      path: 'excel',
      component: Xlsx,
    },
    {
      name: 'love',
      path: 'love',
      component: Love,
    },
  ],
}];

export default data;
