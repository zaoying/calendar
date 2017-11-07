<template>
  <div class="app">
    <tab :tabItem="tabItem"></tab>
    <carousel :initIndex="activeIndex" :swipeEnd="onSwipeEnd">
      <slide v-for="month in monthList" :key="month.getMonth()" style="vertical-align:top;">
        <calendar :itemClick="onItemClick" :date="month"></calendar>
      </slide>
    </carousel>
    <mTable :rows="todoList"></mTable>
  </div>
</template>

<script>
import {lengthOfMonth} from './util.js';
import tab from './Tab.vue';
import table from './Table.vue';
import carousel from './Carousel.vue';
import slide from './Slide.vue';
import calendar from './Calendar.vue';
export default {
  name: 'app',
  data () {
    return {
      activeDate:1,
      activeIndex:2,
      monthList:[],
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
        }]
    };
  },
  created:function () {
      var today=new Date();
      var thisYear=today.getFullYear();
      var thisMonth=today.getMonth();
      var thisDate=today.getDate();
      this.activeDate=thisDate;
      var monthList=[];
      for(var i=-2;i<=2;i++){
        var date=this.generateDate(thisYear,thisMonth+i,thisDate);
        monthList.push(date);
      }
      this.monthList=monthList;
  },
  components:{
    'tab':tab,
    'mTable':table,
    'carousel':carousel,
    'slide':slide,
    'calendar':calendar
  },
  watch:{
    'activeDate':function(val,old){
      var activeDate=this.monthList[this.activeIndex];
      var date=this.generateDate(
        activeDate.getFullYear(),
        activeDate.getMonth(),
        val
      );
      this.monthList.splice(this.activeIndex,1,date);
    },
    'activeIndex':function (val,old) {
      var newMonth=this.monthList[val];
      var lastIndex=this.monthList.length-1;
      var date=this.generateDate(
        newMonth.getFullYear(),
        newMonth.getMonth(),
        this.activeDate
      );
      this.monthList.splice(val,1,date);
      if(val===0){
        var last=this.generateDate(
          newMonth.getFullYear(),
          newMonth.getMonth()-1,
          this.activeDate
        );
        this.monthList.unshift(last);
      }
      else if(val===lastIndex){
        var next=this.generateDate(
          newMonth.getFullYear(),
          newMonth.getMonth()+1,
          this.activeDate
        );
        this.monthList.push(next);
      }
    }
  },
  computed:{
    'tabItem':function () {
      var tabItem=[];
      var length=this.monthList.length;
      for(var i=0;i<length;i++){
        var month=this.monthList[i].getMonth()+1;
        tabItem.push({
          text:month,
          active:i===this.activeIndex
        });
      }
      return tabItem;
    }
  },
  methods:{
    'generateDate':function(year,month,date){
      var length=lengthOfMonth(year,month+1,date);
      var _date=new Date();
      _date.setYear(year);
      _date.setMonth(month);
      _date.setDate(date>length?length:date);
      return _date;
    },
    'onSwipeEnd':function (index) {
      this.activeIndex=index;
    },
    'onItemClick':function (value) {
      this.activeDate=value.date;

      var activeMonth=this.monthList[this.activeIndex];
      var oldMonth=activeMonth.getMonth();
      var newMonth=value.month-1;
      var changed=newMonth-oldMonth;
      this.activeIndex=this.activeIndex+changed;
    }
  }
};
</script>
<style scoped>
  .app{
    display:flex;
    display:-webkit-flex;
    flex-flow: column nowrap;
    height:100%;
  }
</style>