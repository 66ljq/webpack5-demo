console.log('index.js文件被加载了');

// 给首页的按钮增加一个点击事件,为了实现懒加载，即用到某个js文件时才加载该文件
// 引入方式改为动态引入
document.getElementById('btn').onclick = function () {
  // webpackPrefetch: true开启预加载
  import(/*webpackChunkName:'test',webpackPrefetch: true*/'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
}

