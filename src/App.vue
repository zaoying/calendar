<template>
  <div class="app">
    <tab :tabItem="tabItem"></tab>
    <carousel>
      <slide>
        <calendar :year="year" :month="month-1" :date="date"></calendar>
      </slide>
      <slide>
        <calendar :year="year" :month="month" :date="date"></calendar>
      </slide>
      <slide>
        <calendar :year="year" :month="month+1" :date="date"></calendar>
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
    var tody=new Date();
    this.year=tody.getFullYear();
    this.month=tody.getMonth()+1;
    this.date=tody.getDate();
  },
  components:{
    'tab':tab,
    'mTable':table,
    'carousel':carousel,
    'slide':slide,
    'calendar':calendar
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