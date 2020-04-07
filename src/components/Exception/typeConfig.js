import E403 from '../../assets/403.svg';
import E404 from '../../assets/404.svg';
import E500 from '../../assets/500.svg';

const config = {
  403: {
    img: E403,
    title: '权限不足',
    // desc: '',
  },
  404: {
    img: E404,
    title: '404',
    desc: '抱歉，你访问的页面不存在',
  },
  500: {
    img: E500,
    title: '服务升级中',
  },
};

export default config;
