/*
const button = document.createElement('button');
button.innerText = '按钮';
button.addEventListener('click', (params) => {
    // es6草案中的语法，webpack实现，jsonp实现动态加载文件， 返回一个Promise
    import('./source.js').then((data) => {
        console.log(data.default)
    })
});

document.body.appendChild(button);
*/
import str from './source';
console.log(str);
if (module.hot) {
    module.hot.accept('./source', () => {
        console.log('文件更新了');
        let str = require('./source');
        console.log(str)
    })
}
