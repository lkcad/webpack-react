// import jquery from 'jquery'
import moment from 'moment';

// 手动引入
import 'moment/locale/zh-cn'

moment.locale('zh-cn');

let r = moment().endOf('day').fromNow();
console.log("r", r);
