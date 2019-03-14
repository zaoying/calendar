<template>
    <grid :rows="monthList">
    </grid>
</template>
<script>
import grid from './../Grid.vue'
export default {
    name: 'app',
    data () {
        return {
            monthList: []
        }
    },
    props: {
        'activeMonth': {
            type: Number,
            default: 0
        }
    },
    components: {
        'grid': grid
    },
    created() {
        let month = 1;
        for(let i = 0; i < 4; i++){
            let season = [];
            for(let j = 0; j < 3; j++){
                season.push({
                    month: month,
                    active: activeMonth == month
                });
                month++;
            }
            this.monthList.push(season);
        }
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
