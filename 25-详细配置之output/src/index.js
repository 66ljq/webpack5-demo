
import count from './count'
console.log('index.js文件被加载了');

import('./add').then(({ default: add }) => {
    console.log(add(1, 2));
});


console.log(add(1, 2));
console.log(count(2, 3));
