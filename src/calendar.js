/**
 * 计算月份天数
 * @param {Number} year 年份
 * @param {Number} month 月份 
 */
export function lengthOfMonth(year, month) {
    //向上取整，计算自然年份
    let year = year + Math.floor(month / 12); 
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
export function generateWeeks(date){

    function Last(){
    
    }
    function Now(){
    
    }
    function Next(){
    
    }

    //星期列表
    let weekList = [];

    let now = new Date();
    let month = date.getMonth();

    /**
     * 返回当前日期所在的星期
     * @param {Number} year 年份
     * @param {Number} month 月份
     * @param {Number} date 日
     */
    function generateWeek(year, month, date){
        let week = [];
    
        now.setFullYear(year);
        now.setMonth(month);
        now.setDate(date);
        //星期几
        let day = now.getDay();

        var length = lengthOfMonth(year, month);
        for(let i = 0; i < 7; i++){
            
        }
    }
}