import '../css/index.css';
// 引入icon-font样式文件
import '../iconfit/iconfont.css';
// 引入jquery
import $ from 'jquery';


function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log($);

console.log(sum(1, 2, 3, 4));
