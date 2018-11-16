<template>
    <div class = "grid">
        <div :class = "item.style" :key = "item" v-for = "item in gridItem">{{item.text}}</div>
    </div>
</template>
<script>
    export default{
        name: 'grid',
        props: ['gridItem']
    }
</script>
<style scoped>
    .grid{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: flex-start;
        padding: 1%;
    }
    .grid .item{
        flex: 0 1 auto;
        border-radius: 50em;
        display: inline-block;
        color: white;
        line-height: 2em;
        width: 2em;
        text-align: center;
        background-color: rgba(33, 33, 33, 0.5);
    }
    .grid .item.disabled{
        background-color: grey;
    }
</style>