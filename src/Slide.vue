<template>
    <div class="slide" v-bind:style="style">
        <slot></slot>
    </div>
</template>
<script>
    export default{
        name:'slide',
        data:function(){
            return {
                'style':{
                    left:0
                }
            };
        },
        props:{
            'position':{
                'type':Number,
                'default':0
            }
        },
        mounted:function(){
            this.slideWidth=this.$el.offsetWidth;
            this.style.left=(this.position*this.slideWidth)+'px';
        },
        updated:function(){
            this.slideWidth=this.$el.offsetWidth;
            this.style.left=(this.position*this.slideWidth)+'px';
        },
        watch:{
            'position':function(){
                this.style.left=(this.position*this.slideWidth)+'px';
            }
        }
    };
</script>
<style scoped>
</style>