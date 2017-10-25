<template>
    <table class="table">
        <thead v-if="showHead">
            <tr>
                <th :key="key" @click="mColumnClick(value,key)" v-for="(value,key) in header">{{value}}</th>
            </tr>
        </thead>
        <tbody>
            <tr :key="rowId" v-for="(row,rowId) in rows">
                <td :key="key" @click="mCellClick(row,rowId,key)" v-for="(value,key) in header" v-html="mRender(row,key)"></td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    export default{
        name:'table',
        props:['rows','header','renderCell','onColumnClick','onRowClick','onCellClick'],
        computed:{
            'showHead':function(){
                return this.header;
            }
        },
        methods:{
            mRender:function (row,key) {
                if(this.renderCell){
                    return this.renderCell(row,key);
                }
                else return row[key];
            },
            mColumnClick:function(value,key){
                if(this.onColumnClick){
                    this.onColumnClick(value,key);
                }
            },
            mRowClick:function(row,rowId){
                if(this.onRowClick){
                    this.onRowClick(row,rowId);
                }
            },
            mCellClick:function(row,rowId,colId){
                if(this.onCellClick){
                    var cell={
                        rowId:rowId,
                        colId:colId,
                        data:row[colId]
                    };
                    this.onCellClick(cell);
                }
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