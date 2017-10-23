<template>
    <div class="tab">
        <div v-bind:class="[{item:true},{active:item.active}]" v-for="item in tabItem">{{item.text}}</div>
    </div>
</template>
<script>
    export default{
        name:'tab',
        props:['tabItem']
    }
</script>
<style scoped>
    .tab{
        display:flex;
        display:-webkit-flex;
        flex-direction:row;
        justify-content:space-around;
        align-items:flex-start;
        padding:2% 1%;
    }
    .tab .item{
        flex: 0 1 auto;
        display:inline-block;
        color:grey;
        line-height: 2em;
        width: 2em;
        text-align:center;
        border-radius:50em;
    }
    .tab .item.active{
        color:white;
        background-color:rgba(33,33,33,0.5);
    }
</style>