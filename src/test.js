'use strict';

console.info(generateWeeks(new Date()));

/**
 * 计算月份天数
 * @param {Number} year 年份
 * @param {Number} month 月份 
 */
function lengthOfMonth(year, month) {
    //向上取整，计算自然年份
    year = year + Math.floor(month / 12); 
    //求余数，计算自然月份
    let realmonth = month % 12 + 1; 
    //当前月份有多少天
    var length;
    if (realmonth === 2) {
        if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
            length = 29;
        } else length = 28;
    } else if (realmonth === 4 || realmonth === 6 || realmonth === 9 || realmonth === 11) {
        length = 30;
    } else length = 31;
    return length;
}

/**
 * 返回当前日期所在月份的星期列表
 * @param {Date} year 日期
 */
function generateWeeks(date){

    function Last(){
    
    }
    function Now(){
    
    }
    function Next(){
    
    }

    //星期列表
    let weekList = [];

    let year = date.getFullYear();
    let month = date.getMonth();
    let now = new Date();
    now.setDate(1);
    let firstDayOfMonth = now.getDay();

    let nowMonthLength = lengthOfMonth(year, month);

    for(var i = 0; i < 5; i++){
        let offset = firstDayOfMonth + i * 7 - 1;
        let week = generateWeek(offset);
        weekList.push(week);
    }

    return weekList;

    /**
     * 返回当前日期所在的星期
     * @param {Number} offset 日
     */
    function generateWeek(offset){
        let week = [];
        let now = new Date();
    

        for(let day = 7; day > 0; day--){
            let actualDate = offset - day;
            now.setFullYear(year);
            now.setMonth(month);
            now.setDate(actualDate);
            
            week.push({
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                date: now.getDate()
            });
        }
        return week;
    }
}