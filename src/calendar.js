/**
 * 月份枚举
 */
export const MONTH_ENUM = [];
export const MONTH_NAME = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

function Month(length, englishName, name) {
    this.length = length;
    this.englishName = englishName;
    this.name = name;
}

/**
 * 计算月份天数
 * @param {Number} month 月份 
 */
export function lengthOfMonth(month) {
    //求余数，计算自然月份
    let realmonth = month % 12 + 1; 
    //当前月份有多少天
    var length;
    switch(realmonth){
        case 2:
            length = function (year){
                return (this.year % 400 === 0 || (this.year % 4 === 0 && this.year % 100 !== 0)) ? 29 : 28;
            }
        break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            length = 31;
        break;
        case 4:
        case 6:
        case 9:
        case 11:
            length = 30;
        break;
        default:
            length = 0;
    }
    return length;
}

/**
 * 返回当前日期所在月份的星期列表
 * @param {Date} year 日期
 */
export function generateWeeks(date){
    //星期列表
    let weekList = [];

    let year = date.getFullYear();
    let month = date.getMonth();
    let now = new Date();
    now.setDate(1);
    let firstDayOfMonth = now.getDay();

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

(function () {
    let index = 0;
    for(let monthName of MONTH_NAME){
        let length = lengthOfMonth(index);
        MONTH_ENUM.push(new Month(length, monthName, index));
        index++;
    }
})();