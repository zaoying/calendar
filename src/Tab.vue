<template>
    <div class="tab">
        <div v-for="item in tabItem">
            <slot>
                <a v-bind:class="[{item:true},{active:item.active}]">{{item.text}}</a>
            </slot>
        </div>
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
        overflow-x:scroll;
    }
    .tab>div{
        flex: 0 0 20%;
        display:inline-block;
        text-align:center;
    }
    .tab .item{
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