<template>
    <div class = "container">
        <!-- <div class = "column">
            <slot name = "column">
                <div></div>
            </slot>
        </div>
        <div class = "row">
            <slot name = "row">
                <div></div>
            </slot>
        </div> -->
        <div class = "body">
            <grid :header = "titles" :rows = "dataList" @scroll = "onScroll($event)">
                <div slot-scope = "slotProps" slot = "header">
                    <h5>{{slotProps.head.text}}</h5>
                </div>
                <slot></slot>
            </grid>
        </div>
    </div>
</template>
<script>
import grid from './Grid.vue';
export default {
    name: 'FixedHeaderTable',
    data(){
        return {

        };
    },
    components: {
        'grid': grid
    },
    props: {
            'titles': {
                type: Array,
                default: function(){
                    return [];
                }
            },
            'dataList': {
                type: Array,
                default: function(){
                    return [];
                }
            }
    },
    computed: {
        'rows': function(){
            var rows = [];
            for(var row in this.dataList){
                rows.push(row);
            }
            return rows;
        }
    },
    method: {
        'onScroll': function(event){
            console.info(event);
        }
    }
};
</script>
<style scoped>
    .container{
        position: relative;
    }
    .container .column{
        position: absolute;
        top: 0;
        left: 5%;
        height: 5%;
        width: 95%;
        z-index: 9;
    }
    .container .row{
        position: absolute;
        top: 5%;
        left: 0;
        height: 95%;
        width: 5%;
        z-index: 9;
    }
    .container .body{
        position: absolute;
        top: 5%;
        left: 5%;
        width: 90%;
        height: 90%;
        overflow: scroll;
    }
    thead h5{
        margin: 0;
    }
</style>

