<template>
    <mTable :rows="rows" :header="header">
        <tr slot="row" slot-scope="props">
            <td :key="key" v-for="(value,key) in props.header">
                <a v-bind:class="props.row[key].style" @click="onCellClick(props.rowId,key,props.row[key])">
                    {{props.row[key].date}}
                </a>
            </td>
        </tr>
    </mTable>
</template>
<script>
import table from './Table.vue';
export default {
    name:'calendar',
    props:{
        'date':{
            type:Object,
            default:function () {
                var date=new Date()
                return {
                    year:date.getFullYear(),
                    month:date.getMonth()+1,
                    date:date.getDate()
                };
            }
        },
        'itemClick':{
            type: Function,
            default:function(){
                return function(value) {
                    this.date={
                        year:value.year,
                        month:value.month,
                        date:value.date
                    };
                };
            }
        }
    },
    data(){
        return {
            thisDate:1,
            header:['日','一','二','三','四','五','六'],
            rows:[],
            style:{'item':true},
            invalidStyle:{'item':true,'invalid':true},
            activeStyle:{'item':true,'active':true},
            todayStyle:{'item':true,'today':true}
        };
    },
    created:function(){
        var thisYear=this.date.year;
        var thisMonth=this.date.month;
        this.factor=this.factorOfMonth(thisYear,thisMonth);//当前月的因子
        this.lastFactor=this.factorOfMonth(thisYear,thisMonth-1);//上月的因子

        this.Last=this.createItem(thisYear,thisMonth-1,this.invalidStyle);
        this.This=this.createItem(thisYear,thisMonth,this.style);
        this.Next=this.createItem(thisYear,thisMonth+1,this.invalidStyle);
        this.rows=this.generateRows();
        if(this.factor.isInCurrentMonth){
            var today=new Date().getDate();
            this.handleItem(function(item){
                item.today=true;
                return item;
            },today);
        }
        var activeStyle=this.activeStyle;
        this.handleItem(function(item){
            item.style=activeStyle;
            return item;
        },this.date.date);
    },
    components:{
        'mTable':table
    },
    watch:{
        'date':function(val,old){
            console.info(val.year+"-"+val.month+"-"+val.date);
            var newDate=val.date;
            var oldDate=old.date;
            var style=this.style;
            var activeStyle=this.activeStyle;
            var todayStyle=this.todayStyle;
            this.handleItem(function(item){
                item.style=activeStyle;
                return item;
            },newDate);
            this.handleItem(function(item){
                item.style=item.today?todayStyle:style;
                return item;
            },oldDate);
        }
    },
    methods:{
        'onCellClick':function(rowId,colId,value){
            this.itemClick(value);
        },
        'createItem':function(year,month,style){
            var Item=function(){};
            Item.prototype={
                year:year,
                month:month,
                style:style
            };
            return Item;
        },
        'handleItem':function(callback,rowNum,colNum){
            if(colNum){
                var row=this.rows[rowNum];
                var item=row?row[colNum]:null;//ToDo 深拷贝防止修改
                var muteItem=callback(item);
                if(muteItem){
                    row.splice(colNum,1,muteItem);
                    this.rows.splice(rowNum,1,row);
                }
            }
            else{
                var position=rowNum-1+this.factor.firstDayOfMonth;
                var r=Math.floor(position/7);
                var c=position%7;

                var row=this.rows[r];
                var item=row?row[c]:null;//ToDo 深拷贝防止修改
                var muteItem=callback(item);
                if(muteItem){
                    row.splice(c,1,muteItem);
                    this.rows.splice(r,1,row);
                }
            }
        },
        'factorOfMonth':function(year,month){
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
            // var _date = now.getDate();
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
        },
        'generateRows':function () {
            var Last=this.Last;
            var This=this.This;
            var Next=this.Next;

            var thisFactor=this.factor;
            var lastFactor=this.lastFactor;

            var rows=[];
            var k=1;
            var lastSundayOfLastMonth=lastFactor.length-thisFactor.firstDayOfMonth;//上个月最后一个星期日是几号
            var positionOfLastDate=thisFactor.firstDayOfMonth+thisFactor.length;//当前月份最后一天在日历中的位置
            while(k<=positionOfLastDate){
                var row=[];
                for(var j=0;j<7;j++){
                    var item;
                    if(k<=thisFactor.firstDayOfMonth){
                        item=new Last();
                        item.date=lastSundayOfLastMonth+k;
                    }
                    else if(k<=positionOfLastDate){
                        item=new This();
                        item.date=k-thisFactor.firstDayOfMonth;
                    }
                    else{
                        item=new Next();
                        item.date=k-positionOfLastDate;
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

