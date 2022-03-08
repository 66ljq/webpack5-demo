import '../css/index.css';
// 引入icon-font样式文件
import '../iconfit/iconfont.css';


function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sum(1, 2, 3, 4));

// 通过js代码，实现代码分割功能。以ES10的方法引入test.js
// import动态导入语法，能将某个文件单独打包
// webpackChunkName:'test'表示打包后的文件名为test
import(/*webpackChunkName:'test'*/'../js/test')
  .then((result) => {
    console.log(result);
  })
  .catch(() => {
    console.log('文件加载失败~');
  })
