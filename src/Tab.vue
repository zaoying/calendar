<template>
    <div class = "tab">
        <div v-for = "(item, index) in tabItem" :key = "index">
            <slot name = "tab" :item = "item">
                <a :class = "[{item: true}, {active: item.active}]">{{item.text}}</a>
            </slot>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'tab',
        props: ['tabItem', 'activeIndex'],
        mounted() {
            this.itemWidth = this.$el.clientWidth / 5;
        },
        watch:{
            'activeIndex':function(val, old){
                this.$nextTick(function(){
                    this.$el.scrollLeft = val * this.itemWidth;
                });
            }
        }
    };
</script>
<style scoped>
    .tab{
        padding: 2% 0;
        overflow-x: scroll;
        white-space: nowrap;
    }
    .tab>div{
        width: 20%;
        display: inline-block;
        text-align: center;
    }
    .tab .item{
        display: inline-block;
        color: grey;
        line-height: 2em;
        width: 2em;
        text-align: center;
        border-radius: 50em;
    }
    .tab .item.active{
        color: white;
        background-color: rgba(33, 33, 33, 0.5);
        box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.3);
    }
</style>