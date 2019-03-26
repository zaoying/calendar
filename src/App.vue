<template>
  <div class = "app">
    <monthView :activeMonth="activeMonth">
    </monthView>
    <carousel :initIndex = "activeIndex" :swipeEnd = "onSwipeEnd" class="shadow">
      <slide v-for = "(item, index) in monthList" :key = "item.month" :position = "index - offset">
        <calendar :itemClick = "onItemClick" :date = "item.date"></calendar>
      </slide>
    </carousel>
    <fixedHeaderGrid :titles = "header" :dataList = "todoList">
      <tr v-for = "(row, rowId) in todoList" :key = "rowId">
          <td v-for = "(value, key) in header" :key = "key">{{row[value.key]}}</td>
      </tr>
    </fixedHeaderGrid>
  </div>
</template>

<script>
import {lengthOfMonth} from './util.js';
import tab from './Tab.vue';
import monthView from './views/MonthView.vue';
import carousel from './Carousel.vue';
import slide from './Slide.vue';
import calendar from './Calendar.vue';
import fixedHeaderGrid from './FixedHeaderGrid.vue';
export default {
  name: 'app',
  data () {
    return {
      activeDate:  1,
      monthList: [],
      offset: 1,
      activeIndex: 1,
      activeMonth: 1,
      header: [
        {key: 'level', text: '级别'},
        {key: 'no', text: '编号'},
        {key: 'start', text: '开始时间'},
        {key: 'end', text: '结束时间'},
        {key: 'remark', text: '备注'},
        {key: 'repeat', text: '重复'},
        ],
      todoList: [{
          no: '001',
          start: '08:30:00',
          end: '12:00:00',
          remark: '工作',
          repeat: '每天',
          level: 1
        },{
          no: '002',
          start: '12:00:00',
          end: '14:00:00',
          remark: '午休',
          repeat: '每天',
          level: 1
        },{
          no: '003',
          start: '14:00:00',
          end: '17:30:00',
          remark: '工作',
          repeat: '每天',
          level: 1
        }]
    };
  },
  created: function () {
      let today = new Date();
      let thisYear = today.getFullYear();
      let thisMonth = today.getMonth();
      let thisDate = today.getDate();
      this.activeMonth = thisMonth + 1;
      this.activeDate = today.getDate();
      
      let lastMonth = new Date();
      lastMonth.setMonth(thisMonth - 1);

      let nextMonth = new Date();
      nextMonth.setMonth(thisMonth + 1);

      this.monthList.push(lastMonth);
      this.monthList.push(today);
      this.monthList.push(nextMonth);
  },
  components: {
    'tab': tab,
    'monthView': monthView,
    'carousel': carousel,
    'slide': slide,
    'calendar': calendar,
    'fixedHeaderGrid': fixedHeaderGrid
  },
  watch: {
    'activeDate': function(val, old){
      var realIndex = this.activeIndex + this.offset;
      var activeItem = this.tabItem[realIndex];
      var activeDate = activeItem.date;
      var date = this.generateDate(
        activeDate.getFullYear(),
        activeDate.getMonth(),
        val
      );
      activeItem.date = date;
      this.tabItem.splice(realIndex, 1, activeItem);
    }
  },
  methods: {
    'generateDate': function(year, month, date){
      var length = lengthOfMonth(year, month + 1, date);
      var _date = new Date();
      _date.setYear(year);
      _date.setMonth(month);
      _date.setDate(date > length ? length : date);
      return _date;
    },
    'onSwipeEnd': function (index) {
      this.activeIndex = index;
    },
    'onItemClick': function (value) {
      this.activeDate = value.date;

      var realIndex = this.activeIndex + this.offset;
      var activeItem = this.tabItem[realIndex];
      var oldMonth = activeItem.month;
      var newMonth = value.month;
      var changed = newMonth - oldMonth;
      this.activeIndex = this.activeIndex + changed;
    }
  }
};
</script>
<style scoped>
  .app{
    display: flex;
    display: -webkit-flex;
    flex-flow: column nowrap;
    height: 100%;
  }
  .container{
    height: 22em;
  }
  .shadow{
    box-shadow: 0 1px 3px 2px #dddddd
  }
</style>