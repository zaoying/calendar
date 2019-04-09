<template>
    <grid :rows="monthList">
        <tr v-for = "(season, seasonId) in monthList" :key = "seasonId">
            <td v-for = "(month, key) in season" :key = "key">
                <div :class="{item: true, active: month.active}">{{month.month}}</div>
            </td>
        </tr>
    </grid>
</template>
<script>
import grid from './../Grid.vue'
export default {
    name: 'app',
    data () {
        return {
            monthList: [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
                [10, 11, 12]
            ]
        }
    },
    props: {
        'activeMonth': {
            type: Number,
            default: 1
        }
    },
    components: {
        'grid': grid
    },
    created() {
        this.monthList = this.monthList.map(
            season => season.map(
                month => month = {month: month, active: month === this.activeMonth}));
    },
    watch: {
        'activeMonth': function (val, old) {
            let season = Math.floor(val / 3);
            let index = val - season * 3;

            let newActive = this.monthList[season][index];
            newActive.active = true;
            this.monthList[season].slice(index, 1, newActive);

            season = Math.floor(old / 3);
            index = old - season * 3;

            let oldActive = this.monthList[season][index];

            oldActive.active = false;
            this.monthList[season].slice(index, 1, oldActive);
        }
    }
};
</script>
<style scoped>
.item{
    display: inline-block;
    border-radius: 50em;
}
.active.item{
    color: #fff;
    background-color: #333333;
}
</style>

