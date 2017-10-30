<template>
  <div class="app">
    <tab :tabItem="tabItem"></tab>
    <carousel :initIndex="activeIndex" :swipeEnd="onSwipeEnd">
      <slide v-for="month in monthList" :key="month.month" style="vertical-align:top">
        <calendar :itemClick="onItemClick" :date="month"></calendar>
      </slide>
    </carousel>
    <mTable :rows="todoList"></mTable>
  </div>
</template>

<script>
import tab from './Tab.vue'
import table from './Table.vue'
import carousel from './Carousel.vue'
import slide from './Slide.vue'
import calendar from './Calendar.vue'
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
    }
  },
  created:function () {
      var thisYear=this.today.getFullYear();
      var thisMonth=this.today.getMonth()+1;
      var thisDate=this.today.getDate();
      function Month() {
        
      };
      Month.prototype={
        date:thisDate
      };
      var monthList=[];
      for(var i=-2;i<=2;i++){
        var month=new Month();
        month.month=thisMonth+i;
        month.year=thisYear;
        monthList.push(month);
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
        var month=this.monthList[i].month;
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
      this.activeIndex=index;
      var month=this.monthList[index];
      var date={
        year:month.year,
        month:month.month,
        date:activeMonth.date
      };
      this.monthList.splice(this.activeIndex,1,date);
    },
    'onItemClick':function (value) {
      var thisMonth=this.today.getMonth()+1;
      var changed=value.month-thisMonth;
      this.activeIndex=this.activeIndex+changed;
      var activeMonth=this.monthList[this.activeIndex];
      var date;
      if(changed===0){
        date={
            year:value.year,
            month:value.month,
            date:value.date
        }
      }
      else{
        date={
            year:activeMonth.year,
            month:activeMonth.month,
            date:value.date
        }
      }
      this.monthList.splice(this.activeIndex,1,date);
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
</style>