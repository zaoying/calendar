<template>
    <table class = "table" v-if = "showHead">
        <thead>
            <tr>
                <th v-for = "(value, key) in header" :key = "key">
                    <slot name = "header" :head = "value">{{value}}</slot>
                </th>
            </tr>
        </thead>
        <tbody>
            <slot :rows = "rows" :header = "header">
                <tr v-for = "(row, rowId) in rows" :key = "rowId">
                    <td v-for = "(value, key) in header" :key = "key">{{row[key]}}</td>
                </tr>
            </slot>
        </tbody>
    </table>
    <table class = "table" v-else>
        <tbody>
            <slot :rows = "rows">
                <tr v-for = "(row, rowId) in rows" :key = "rowId">
                    <td v-for = "(value, key) in row" :key = "key">{{row[key]}}</td>
                </tr>
            </slot>
        </tbody>
    </table>
</template>
<script>
    export default {
        name: 'table',
        props: {
            'header': {
                type: Array,
                default: function(){
                    return [];
                }
            },
            'rows': {
                type: Array,
                required: true,
                default: function(){
                    return [];
                }
            }
        },
        computed: {
            'showHead': function(){
                return this.header&&this.header.length>0;
            }
        }
    }
</script>
<style scope>
    .table{
        width: 100%;
    }
    tr th, tr td{
        padding: 2% 0;
        text-align: center;
    }
</style>