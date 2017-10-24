<template>
  <div class="app">
    <tab :tabItem="tabItem"></tab>
    <mTable :rows="rows" :header="header" :renderCell="renderCell"></mTable>
    <mTable :rows="todoList"></mTable>
  </div>
</template>

<script>
import tab from './Tab.vue'
import table from './Table.vue'
export default {
  name: 'app',
  data () {
    return {
      todoList:[{
          no:'001',
          start:'09:00:00',
          end:'12:00:00',
          remark:'工作',
          repeat:'每天',
          level:1
        },{
          no:'002',
          start:'12:00:00',
          end:'14:00:00',
          remark:'午休',
          repeat:'每天',
          level:1
        },{
          no:'003',
          start:'14:00:00',
          end:'18:00:00',
          remark:'工作',
          repeat:'每天',
          level:1
        }],
      table:{
        rows:[],
        header:{
            no:'编号',
            level:'级别',
            start:'开始时间',
            end:'结束时间',
            repeat:'重复',
            remark:'备注'
        },
        renderCell:function (row,key) {
          return row[key];
        }
      }
    }
  },
  created:function () {
      function Style(){

      };
      Style.prototype={
        item:true
      };
      this.headStyle=new Style();
      this.headStyle.header=true;
      this.cellStyle=new Style();
      this.cellStyle.cell=true;

      var now=new Date();
      var date=now.getDate();
      var month=now.getMonth();
      var year=now.getFullYear();
      this.current={
        year:year,
        month:month,
        date:date
      };
      now.setDate(1);
      var day=now.getDay();
      var time=now.getTime();
      this.dayOfMonth=day+date;
      this.dayOfWeek=day;
      this.lastDayOfMonth=this.lengthOfMonth(year,month+1)+day;
      this.lastSunDayOfLastMonth=new Date(time-this.dayOfWeek*24*3600*1000);
  },
  components:{
    'tab':tab,
    'mTable':table
  },
  computed:{
    'now':function(){
      return new Date()
    },
    'tabItem':function () {
      var month=[];
      var current=this.now.getMonth()+1;
      for(var i=-2;i<=2;i++){
        month.push({
          text:current+i,
          active:i===0
        });
      }
      return month;
    },
    'header':function () {
      return ['日','一','二','三','四','五','六'];
    },
    'rows':function () {
      var start=this.lastSunDayOfLastMonth.getTime();
      var rows=[];
      var k=0;
      for(var i=1;i<=5;i++){
        var row=[];
        for(var j=0;j<7;j++){
          var date=new Date(start+(k++)*24*3600*1000);
          row.push({
            date:date,
            active:k===this.dayOfMonth,
            preMonth:k<this.dayOfWeek,
            nextMonth:k>this.lastDayOfMonth
            });
        }
        rows.push(row);
      }
      return rows;
    }
  },
  methods:{
    'renderCell':function(row,key){
      var data=row[key];
      var date=data.date;
      var style=data.active?"active ":"";
      style+=data.preMonth?"invalid ":"";
      style+=data.nextMonth?"invalid ":"";
      return '<a class="item '+style+'">'+date.getDate()+'</a>';
    },
    'lengthOfMonth':function(year,month){
      if(month===2){
        if(year%400===0||(year%4===0&&year%100!==0)){
          return 29;
        }
        else return 28;
      }
      else if(month===4||month===6||month===9||month===11){
        return 30;
      }
      else return 31;
    }
  }
}
</script>
<style scoped>
  .app{
    display:flex;
    display:-webkit-flex;
    flex-flow: column nowrap;
    height:100%;
  }
