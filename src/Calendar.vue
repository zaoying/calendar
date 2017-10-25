<template>
    <mTable :rows="rows" :header="header" :renderCell="renderCell" :onCellClick="onCellClick"></mTable>
</template>
<script>
import table from './Table.vue'
export default {
    name:'calendar',
    props:['year','month','date'],
    data(){
        return {
            thisDate:1,
            header:['日','一','二','三','四','五','六'],
            style:['item'],
            invalidStyle:['item','invalid'],
            todayStyle:['item','today'],
            activeStyle:['item','active']
        }
    },
    created:function(){
        this.thisDate=this.date;
        this.factor=this.factorOfMonth(this.year,this.month);//当前月的因子
        this.lastFactor=this.factorOfMonth(this.year,this.month-1);//上月的因子

        this.Last=this.createItem(this.year,this.month-1,this.invalidStyle);
        this.This=this.createItem(this.year,this.month,this.style);
        this.Next=this.createItem(this.year,this.month+1,this.invalidStyle);
    },
    components:{
        'mTable':table
    },
    watch:{
        'thisDate':function(val,old){
            // console.info(old+"->"+val);
            // var style=this.style;
            // var activeStyle=this.activeStyle;
            // this.handleItem(function(item){
            //     item.style=activeStyle;
            //     return item;
            // },val);
            // this.handleItem(function(item){
            //     item.style=style;
            //     return item;
            // },old);
        }
    },
    computed:{
        'rows':function () {
            var thisYear=this.year;
            var thisMonth=this.month;

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
            var active=this.thisDate;
            var position=active-1+thisFactor.firstDayOfMonth;
            var row=Math.floor(position/7);
            var col=position%7;
            rows[row][col].style=this.activeStyle;
            if(thisFactor.isInCurrentMonth){
                var today=new Date().getDate();
                var position=today-1+thisFactor.firstDayOfMonth;
                var row=Math.floor(position/7);
                var col=position%7;
                rows[row][col].style=this.todayStyle;
            }
            return rows;
        }
    },
    methods:{
        'renderCell':function(row,key){
            var data=row[key];
            var date=data.date;
            var style=data.style.join(' ');
            return '<a class="'+style+'">'+date+'</a>';
        },
        'onCellClick':function(cell){
            var value=cell.data;
            this.thisDate=value.date;
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
                var item=row?Object.assign({},row[colNum]):null;
                var muteItem=callback(item);
                if(muteItem){
                    var muteRow=row.splice(colNum,muteItem);
                    this.rows.splice(rowNum,muteRow);
                }
            }
            else{
                var position=rowNum-1+this.factor.firstDayOfMonth;
                var rowNum=Math.floor(position/7);
                var colNum=position%7;

                var row=this.rows[rowNum];
                var item=row?Object.assign({},row[colNum]):null;
                var muteItem=callback(item);
                if(muteItem){
                    var muteRow=row.splice(colNum,muteItem);
                    this.rows.splice(rowNum,muteRow);
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
            var _date = now.getDate();
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
            }
        }
    }
}
</script>
<style scoped>

</style>

