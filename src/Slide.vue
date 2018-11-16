<template>
    <div class = "slide" :style = "style">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'slide',
        data(){
            return {
                'style': {
                    left: 0
                }
            };
        },
        props: {
            'position': {
                'type': Number,
                'default': 0
            }
        },
        mounted(){
            this.slideWidth = this.$el.offsetWidth;
            this.style.left = (this.position * this.slideWidth) + 'px';
        },
        updated(){
            this.slideWidth = this.$el.offsetWidth;
            this.style.left = (this.position * this.slideWidth) + 'px';
        },
        watch: {
            'position': function(){
                this.style.left = (this.position * this.slideWidth) + 'px';
            }
        }
    };
</script>
<style scoped>
</style>