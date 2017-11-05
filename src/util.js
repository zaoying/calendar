//是否在当前月份
export function isInCurrentMonth(year,month){
    var now = new Date();
    var _year = now.getFullYear();
    var _month = now.getMonth();
    return _year===year&&_month===month;
}
export function lengthOfMonth(realYear,realMonth){
    var month=realMonth-1;//0表示一月，所以需要减去一
    var year=realYear+Math.floor(month/12);//向上取整，计算实际年份
    month=month%12+1;//求余数，计算实际月份
    var length;//当前月份有多少天
    if(month===2){
        if(year%400===0||(year%4===0&&year%100!==0)){
        length = 29;
        }
        else length = 28;
    }
    else if(month===4||month===6||month===9||month===11){
        length = 30;
    }
    else length = 31;
    return length;
}
function factorOfMonth(realYear,realMonth){
    //当前月份有多少天
    var length=lengthOfMonth(realYear,realMonth);

    var month=realMonth-1;//0表示一月，所以需要减去一
    var year=realYear+Math.floor(month/12);//向上取整，计算实际年份
    month=month%12;//求余数，计算实际月份

    //是否在当前月份
    var isCurrentMonth=isInCurrentMonth(year,month);
    
    var now=new Date();
    now.setFullYear(year);
    now.setMonth(month);
    now.setDate(1);
    var firstDayOfMonth=now.getDay();//当前月份第一天是星期几,0表示星期日
    var lastDayOfMonth=(length+firstDayOfMonth)%7;//当前月份最后一天是星期几
    return {
        isInCurrentMonth:isCurrentMonth,
        length:length,
        firstDayOfMonth:firstDayOfMonth,
        lastDayOfMonth:lastDayOfMonth
    };
}
export default factorOfMonth;