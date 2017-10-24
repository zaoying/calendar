<template>
    <table class="table">
        <thead v-if="showHead">
            <tr>
                <th v-for="(value,key) in header">{{value}}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in rows">
                <td v-for="(value,key) in header" v-html="mRender(row,key)"></td>
            </tr>
        </tbody>
    </table>
</template>
<script>
    export default{
        name:'table',
        props:['rows','header','renderCell'],
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