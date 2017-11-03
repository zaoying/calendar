<template>
  <div class="app">
    <tab :tabItem="tabItem"></tab>
    <carousel :initIndex="activeIndex" :swipeEnd="onSwipeEnd">
      <slide v-for="month in monthList" :key="month.getMonth()" style="vertical-align:top">
        <calendar :itemClick="onItemClick" :date="month"></calendar>
      </slide>
    </carousel>
    <mTable :rows="todoList"></mTable>
  </div>
</template>

<script>
import tab from './Tab.vue';
import table from './Table.vue';
import carousel from './Carousel.vue';
import slide from './Slide.vue';
import calendar from './Calendar.vue';
export default {
  name: 'app',
  data () {
    return {
      today:new Date(),
      monthList:[],
      activeIndex:2,
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
      var thisYear=this.today.getFullYear();
      var thisMonth=this.today.getMonth();
      var thisDate=this.today.getDate();
      var monthList=[];
      for(var i=-2;i<=2;i++){
        var date=new Date();
        date.setYear(thisYear);
        date.setMonth(thisMonth+i);
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
    'today':function (val,old) {
      // console.info(old.getMonth()+"->"+val.getMonth());
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
    'onSwipeEnd':function (index) {
      var activeMonth=this.monthList[this.activeIndex];
      var month=this.monthList[index];
      var date=new Date();
      date.setYear(month.getFullYear());
      date.setMonth(month.getMonth());
      date.setDate(activeMonth.getDate());
      this.monthList.splice(index,1,date);
      this.activeIndex=index;
    },
    'generateMonth':function(year,month){

    },
    'onItemClick':function (value) {
      console.info(value);
      var activeMonth=this.monthList[this.activeIndex];
      var oldMonth=activeMonth.getMonth();
      var newMonth=value.month-1;
      var changed=newMonth-oldMonth;
      var newIndex=this.activeIndex+changed;
      var date=new Date();
      if(changed===0){
        date.setYear(value.year);
        date.setMonth(oldMonth);
        date.setDate(value.date);
      }
      else{
        date.setYear(activeMonth.getFullYear());
        date.setMonth(newMonth);
        date.setDate(value.date);
      }
      this.monthList.splice(newIndex,1,date);
      this.activeIndex=newIndex;
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