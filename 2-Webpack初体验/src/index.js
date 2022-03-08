// index.js: webpack入口起点文件
// 运行webpack指令：
/*  开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
    从src下的index.js，-o表示生成后存储的路径为build下的built.js，--mode表示开发环境
    在package.json中配置后，运行命令为npm run dev,使用默认路径，入口是src下的index.js，出口是dist下的main.js
    生产环境：除了--mode=production外，其他命令都相同，在package.json中配置后，运行命令为npm run build*/
    function add(x,y){
        return x+y;
    }
    console.log(add(1,2));
    