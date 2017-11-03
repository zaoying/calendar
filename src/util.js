function factorOfMonth(realYear,realMonth){
    var month=realMonth-1;
    var year=realYear+Math.floor(month%12);
    month=month%12+1;
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

    var now = new Date();
    var _year = now.getFullYear();
    var _month = now.getMonth()+1;
    var isInCurrentMonth=_year===year&&_month===month;//是否在当前月份

    now.setFullYear(year);
    now.setMonth(month-1);//0表示一月，所以需要减去一
    now.setDate(1);
    var firstDayOfMonth=now.getDay();//当前月份第一天是星期几,0表示星期日
    var lastDayOfMonth=(length+firstDayOfMonth)%7;//当前月份最后一天是星期几
    return {
        isInCurrentMonth:isInCurrentMonth,
        length:length,
        firstDayOfMonth:firstDayOfMonth,
        lastDayOfMonth:lastDayOfMonth
    };
}
export default factorOfMonth;