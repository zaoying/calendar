export function debounce(fn, idle) {
    var last;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(last);
        last = setTimeout(function () {
            fn.apply(context, args);
        }, idle);
    };
}
export function throttle(fn, atLeast) {
    var previous = null;
    return function () {
        var ctx = this, args = arguments;
        var now = new Date().getTime();
        if (!previous) {
            previous = now;
        } else{
            var interval = now - previous;
            if(interval>atLeast){
                previous = now;
                fn.apply(ctx, args);
            }
        }
    };
}
//是否在当前月份
export function isInCurrentMonth(year, month) {
    var now = new Date();
    var _year = now.getFullYear();
    var _month = now.getMonth();
    return _year === year && _month === month;
}
export function lengthOfMonth(realYear, realMonth) {
    //0表示一月，所以需要减去一
    var month = realMonth - 1; 
    //向上取整，计算实际年份
    var year = realYear + Math.floor(month / 12); 
    //求余数，计算实际月份
    month = month % 12 + 1; 
    //当前月份有多少天
    var length; 
    if (month === 2) {
        if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
            length = 29;
        } else length = 28;
    } else if (month === 4 || month === 6 || month === 9 || month === 11) {
        length = 30;
    } else length = 31;
    return length;
}

function factorOfMonth(realYear, realMonth) {
    //当前月份有多少天
    var length = lengthOfMonth(realYear, realMonth);
    
    //0表示一月，所以需要减去一
    var month = realMonth - 1; 
    //向上取整，计算实际年份
    var year = realYear + Math.floor(month / 12); 
    //求余数，计算实际月份
    month = month % 12; 

    //是否在当前月份
    var isCurrentMonth = isInCurrentMonth(year, month);

    var now = new Date();
    now.setFullYear(year);
    now.setMonth(month);
    now.setDate(1);
    //当前月份第一天是星期几, 0表示星期日
    var firstDayOfMonth = now.getDay(); 
    //当前月份最后一天是星期几
    var lastDayOfMonth = (length + firstDayOfMonth) % 7; 
    return {
        isInCurrentMonth: isCurrentMonth,
        length: length,
        firstDayOfMonth: firstDayOfMonth,
        lastDayOfMonth: lastDayOfMonth
    };
}
export default factorOfMonth;