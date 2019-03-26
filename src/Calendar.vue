<template>
    <grid :rows = "weeks" :header = "header" :id = "month">
        <tr v-for = "(week, weekId) in weeks" :key = "weekId">
            <td v-for = "(value, key) in header" :key = "key">
                <a :class = "week[key].style" @click = "onCellClick(weekId, key, week[key])">
                    {{week[key].date.date}}
                </a>
            </td>
        </tr>
    </grid>
</template>
<script>
import grid from './Grid.vue';
import generateWeeks from './calendar.js';
export default {
    name: 'calendar',
    props: {
        'date': {
            type: Date,
            default: function () {
                return new Date();
            }
        },
        'itemClick': {
            type: Function,
            default: function(){
                return function(value) {
                    var date = new Date();
                    date.setYear(value.year);
                    date.setMonth(value.month - 1);
                    date.setDate(value.date);
                    this.date = date;
                };
            }
        }
    },
    data(){
        return {
            header: ['日', '一', '二', '三', '四', '五', '六'],
            weeks: [],
            month: 1,
            style: {'item': true},
            invalidStyle: {'item': true, 'invalid': true},
            activeStyle: {'item': true, 'active': true},
            todayStyle: {'item': true, 'today': true}
        };
    },
    created: function(){
        var thisYear = this.date.getFullYear();
        var thisMonth = this.date.getMonth() + 1;
        this.month = thisMonth;

        this.Last = this.createItem(this.invalidStyle);
        this.This = this.createItem(this.style);
        this.Next = this.createItem(this.invalidStyle);
        this.weeks = this.generateRows();
        
        // let activeStyle = this.activeStyle;
        // var date = this.date.getDate();
        // this.handleItem(function(item){
        //     item.style = activeStyle;
        //     return item;
        // }, date);
    },
    components: {
        'grid': grid
    },
    watch: {
        'date': function(val, old){
            var newDate = val.getDate();
            var oldDate = old.getDate();
            var style = this.style;
            var activeStyle = this.activeStyle;
            var todayStyle = this.todayStyle;
            this.handleItem(function(item){
                item.style = item.today ? todayStyle : style;
                return item;
            }, oldDate);
            this.handleItem(function(item){
                item.style = activeStyle;
                return item;
            }, newDate);
        }
    },
    methods: {
        'onPreMonthSelected': function(weekId, day, value){
            
        },
        'onCellClick': function(weekId, colId, value){
            this.itemClick(value);
        },
        'onNextMonthSelected': function(weekId, day, value){
            
        },
        'createItem': function(style){
            return function(date){
                this.style = style
                this.date = date;
            };
            Item;
        },
        'handleItem': function(callback, rowNum, colNum){
            var row, item, muteItem;
            if(colNum){
                row = this.rows[rowNum];
                //ToDo 深拷贝防止修改
                item = row ? row[colNum] : null;
                muteItem = callback(item);
                if(muteItem){
                    row.splice(colNum, 1, muteItem);
                    this.rows.splice(rowNum, 1, row);
                }
            }
            else{
                var position = rowNum - 1 + this.factor.firstDayOfMonth;
                var r = Math.floor(position / 7);
                var c = position % 7;

                row = this.rows[r];
                //ToDo 深拷贝防止修改
                item = row ? row[c] : null;
                muteItem = callback(item);
                if(muteItem){
                    row.splice(c, 1, muteItem);
                    this.rows.splice(r, 1, row);
                }
            }
        },
        'generateRows': function () {
            let Last = this.Last;
            let This = this.This;
            let Next = this.Next;

            let rows = [];
            let weeks = generateWeeks(this.date);
            for(let week of weeks){
                let row = [];
                for(let day of week){
                    let item;
                    if (day.month === this.month){
                        item = new This(day);
                    }
                    else if(day.month < this.month){
                        item = new Last(day);
                    }
                    else{
                        item = new Next(day);
                    }
                    row.push(item);
                }
                rows.push(row);
            }
            return rows;
        }
    }
};
</script>
<style scoped>

</style>

