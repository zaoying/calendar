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
      year:1970,
      month:1,
      date:1,
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
    var today=new Date();
    this.year=today.getFullYear();
    this.month=today.getMonth()+1;
    this.date=today.getDate();
    function Month() {
      
    };
    Month.prototype={
      date:this.date
    };
    var monthList=[];
    for(var i=-2;i<=2;i++){
      var month=new Month();
      month.month=this.month+i;
      month.year=this.year;
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
      this.activeIndex=index;
      var month=this.monthList[index];
      this.month=month.month;
      this.date=month.date;
    },
    'onItemClick':function (value) {
        this.activeIndex=this.activeIndex+value.month-this.month;
        this.month=value.month;
        this.date=value.date;
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