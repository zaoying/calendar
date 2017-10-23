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
        text-align:center;
    }
    tr td a{
        display:inline-block;
        width:2em;
        line-height:2em;
        border-radius:50em;
        background-color:rgba(33,33,33,0.5);
    }
</style>