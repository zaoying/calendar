<template>
    <table class="table">
        <thead v-if="showHead">
            <tr>
                <slot name="header" :val="value" :headId="key" v-for="(value,key) in header">
                    <th>{{value}}</th>
                </slot>
            </tr>
        </thead>
        <tbody>
            <slot name="row" :rowId="rowId" :row="row" :header="header" v-for="(row,rowId) in rows">
                <tr :key="rowId" v-for="(row,rowId) in rows">
                    <td :key="key" v-for="(value,key) in header">{{row[key]}}</td>
                </tr>
            </slot>
        </tbody>
    </table>
</template>
<script>
    export default{
        name:'table',
        props:{
            'header':{
                type:Array,
                default:function(){
                    return [];
                }
            },
            'rows':{
                type:Array,
                required:true,
                default:[]
            }
        },
        computed:{
            'showHead':function(){
                return this.header&&this.header.length>0;
            }
        }
    }
</script>
<style scope>
    .table{
        width:100%;
    }
    tr th,tr td{
        padding: 2% 0;
        text-align:center;
    }
</style>