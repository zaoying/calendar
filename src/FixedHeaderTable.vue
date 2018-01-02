<template>
    <div class="container">
        <div class="column">
            <slot name="column">
                <div></div>
            </slot>
        </div>
        <div class="row">
            <slot name="row">
                <div></div>
            </slot>
        </div>
        <div class="body">
            <mTable :header="header" rows="dataList" @scroll="onScroll($event)">
                <slot name="column" slot="header" class="row">
                    <div></div>
                </slot>
                <slot></slot>
            </mTable>
        </div>
    </div>
</template>
<script>
import table from './Table.vue';
export default {
    name:'FixedHeaderTable',
    data(){
        return {

        };
    },
    components:{
        'mTable':table
    },
    props:{
            'header':{
                type:Array,
                default:function(){
                    return [];
                }
            },
            'data':{
                type:Array,
                default:function(){
                    return [];
                }
            }
    },
    computed:{
        'dataList':function(){
            return this.data;
        },
        'rows':function(){
            var rows=[];
            for(var row in this.data){
                rows.push(row);
            }
            return rows;
        }
    },
    method:{
        'onScroll':function(event){
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
        width:5%;
        z-index: 9;
    }
    .container .body{
        position: absolute;
        top: 5%;
        left: 5%;
        width: 95%;
        height: 95%;
        overflow: scroll;
    }
</style>

