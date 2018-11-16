<template>
    <mTable :rows = "rows" :header = "header" :id = "month">
        <tr v-for = "(row, rowId) in rows" :key = "rowId">
            <td v-for = "(value, key) in header" :key = "key">
                <a :class = "row[key].style" @click = "onCellClick(rowId, key, row[key])">
                    {{row[key].date}}
                </a>
            </td>
        </tr>
    </mTable>
</template>
<script>
import table from './Table.vue';
import factorOfMonth from './util.js';
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
            rows: [],
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
        //上月的因子
        this.lastFactor = factorOfMonth(thisYear, thisMonth - 1);
        //当前月的因子
        this.factor = factorOfMonth(thisYear, thisMonth);

        this.Last = this.createItem(thisYear, thisMonth - 1, this.invalidStyle);
        this.This = this.createItem(thisYear, thisMonth, this.style);
        this.Next = this.createItem(thisYear, thisMonth + 1, this.invalidStyle);
        this.rows = this.generateRows();
        if(this.factor.isInCurrentMonth){
            var today = new Date().getDate();
            this.handleItem(function(item){
                item.today = true;
                return item;
            }, today);
        }
        var activeStyle = this.activeStyle;
        var date = this.date.getDate();
        this.handleItem(function(item){
            item.style = activeStyle;
            return item;
        }, date);
    },
    components: {
        'mTable': table
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
        'onCellClick': function(rowId, colId, value){
            this.itemClick(value);
        },
        'createItem': function(year, month, style){
            var Item = function(){};
            Item.prototype = {
                year: year,
                month: month,
                style: style
            };
            return Item;
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
            var Last = this.Last;
            var This = this.This;
            var Next = this.Next;

            var thisFactor = this.factor;
            var lastFactor = this.lastFactor;

            var rows = [];
            var k = 1;
            //上个月最后一个星期日是几号
            var lastSundayOfLastMonth = lastFactor.length - thisFactor.firstDayOfMonth;
            //当前月份最后一天在日历中的位置
            var positionOfLastDate = thisFactor.firstDayOfMonth + thisFactor.length;
            while(k <= positionOfLastDate){
                var row = [];
                for(var j = 0; j < 7; j++){
                    var item;
                    if(k <= thisFactor.firstDayOfMonth){
                        item = new Last();
                        item.date = lastSundayOfLastMonth + k;
                    }
                    else if(k <= positionOfLastDate){
                        item = new This();
                        item.date = k - thisFactor.firstDayOfMonth;
                    }
                    else{
                        item = new Next();
                        item.date = k - positionOfLastDate;
                    }
                    row.push(item);
                    k++;
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

