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
        for(var i = 0; i < 12; i++){
            this.monthList.push({
                month: i + 1,
                active: false
            });
        }
        this.monthList[activeMonth].active = true;
    },
    watch: {
        'activeMonth': function (val, old) {
            let newActive = this.monthList[val];
            newActive.active = true;
            this.monthList.slice(val, 1, newActive);

            let oldActive = this.monthList[old];
            oldActive.active = false;
            this.monthList.slice(old, 1, oldActive);
        }
    }
};
</script>
