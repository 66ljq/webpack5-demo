import '../css/index.css';
// 引入icon-font样式文件
import '../iconfit/iconfont.css';
// 只引入test.js中的一个mul函数
import { mul } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(mul(2, 2));

console.log(sum(1, 2, 3, 4));

//注册serviceworker
//处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js ').then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}

