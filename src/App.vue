<template>
  <div class="app">
    <tab :tabItem="tabItem">
        <a slot="tab" slot-scope="props" v-bind:class="[{item:true},{active:props.item.active}]">{{props.item.month}}</a>
    </tab>
    <carousel :initIndex="activeIndex" :swipeEnd="onSwipeEnd">
      <slide v-for="(item,index) in tabItem" :key="item.month" :position="index-offset">
        <calendar :itemClick="onItemClick" :date="item.date"></calendar>
      </slide>
    </carousel>
    <fixedTable :header="header" :data="todoList">
      <span slot="column" slot-scope="props">{{props.val.text}}</span>
      <tr v-for="(row,rowId) in todoList" :key="rowId">
          <td v-for="(value,key) in header" :key="key">{{row[value.key]}}</td>
      </tr>
    </fixedTable>
  </div>
</template>

<script>
import {lengthOfMonth} from './util.js';
import tab from './Tab.vue';
import table from './Table.vue';
import carousel from './Carousel.vue';
import slide from './Slide.vue';
import calendar from './Calendar.vue';
import fixedHeaderTable from './FixedHeaderTable.vue';
export default {
  name: 'app',
  data () {
    return {
      activeDate:1,
      activeIndex:0,
      offset:2,
      tabItem:[],
      header:[
        {key:'level',text:'级别'},
        {key:'no',text:'编号'},
        {key:'start',text:'开始时间'},
        {key:'end',text:'结束时间'},
        {key:'remark',text:'备注'},
        {key:'repeat',text:'重复'},
        ],
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
      this.activeDate=today.getDate();
      var tabItem=[];
      var offset=this.offset;
      for(var i=-offset;i<=offset;i++){
        var date=this.generateDate(
          thisYear,
          thisMonth+i,
          this.activeDate
        );
        tabItem.push({
          index:i,
          active:i===this.activeIndex,
          month:date.getMonth()+1,
          date:date
        });
      }
      this.tabItem=tabItem;
  },
  components:{
    'tab':tab,
    'mTable':table,
    'carousel':carousel,
    'slide':slide,
    'calendar':calendar,
    'fixedTable':fixedHeaderTable
  },
  watch:{
    'activeDate':function(val,old){
      var realIndex=this.activeIndex+this.offset;
      var activeItem=this.tabItem[realIndex];
      var activeDate=activeItem.date;
      var date=this.generateDate(
        activeDate.getFullYear(),
        activeDate.getMonth(),
        val
      );
      activeItem.date=date;
      this.tabItem.splice(realIndex,1,activeItem);
    },
    'activeIndex':function (val,old) {
      var oldIndex=old+this.offset;
      var newIndex=val+this.offset;
      var oldTab=this.tabItem[oldIndex];
      oldTab.active=false;
      this.tabItem.splice(oldIndex,1,oldTab);
      var newTab=this.tabItem[newIndex];
      newTab.active=true;
      var activeDate=newTab.date;
      newTab.date=this.generateDate(
          activeDate.getFullYear(),
          activeDate.getMonth(),
          this.activeDate
      );
      this.tabItem.splice(newIndex,1,newTab);
      
      var lastIndex=this.tabItem.length-1;
      var date;
      if(newIndex===0){
        date=this.generateDate(
          newTab.date.getFullYear(),
          newTab.month-2,
          this.activeDate
        );
        var last={
          index:val-1,
          month:date.getMonth()+1,
          date:date,
          active:false
        };
        this.tabItem.unshift(last);
        this.offset++;
      }
      else if(newIndex===lastIndex){
        date=this.generateDate(
          newTab.date.getFullYear(),
          newTab.month,
          this.activeDate
        );
        var next={
          index:val+1,
          month:date.getMonth()+1,
          date:date,
          active:false
        };
        this.tabItem.push(next);
      }
    }
  },
  computed:{
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

      var realIndex=this.activeIndex+this.offset;
      var activeItem=this.tabItem[realIndex];
      var oldMonth=activeItem.month;
      var newMonth=value.month;
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
  .container{
    height: 21em;
  }
</style>