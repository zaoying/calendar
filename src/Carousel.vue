<template>
    <div class="container" @touchstart="touchStart($event)" @touchmove="touchMove($event)" 
    @touchend="touchEnd($event)" @touchcancel="touchCancel($event)">
        <div v-bind:class="['wrapper']" v-bind:style="style">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name:'carousel',
    data(){
        return {
            translateX:0,
            activeIndex:this.initIndex,
            style:{
                transform:'translateX(0)'
            }
        };
    },
    updated:function () {
        this.childrenNum=this.$children.length;
        this.slideWidth=this.$el.clientWidth;
        this.slideTo(this.activeIndex);
    },
    props:{
        'initIndex':{
            type:Number,
            default:0
        },
        'swipeEnd':{
            type:Function,
            default:function () {
                return function (index) {
                };
            }
        }
    },
    watch:{
        'initIndex':function (val,old) {
            this.slideTo(val);
        },
        'translateX':function (val,old) {
            this.style={
                transform:"translateX("+(0-this.translateX)+"px)"
            };
        }
    },
    methods:{
        'touchStart':function (event) {
            this.copyTranslateX=this.translateX;
            this.startX=event.touches[0].pageX;
        },
        'touchMove':function (event) {
            this.endX=event.touches[0].pageX;
            var distance=this.startX-this.endX;
            if(this.endX>=0&&this.endX<=this.slideWidth){
                this.translateX=distance+this.copyTranslateX;
            }
        },
        'touchEnd':function (event) {
            this.endX=event.changedTouches[0].pageX;
            var distance=this.endX-this.startX;
            if(distance>=this.slideWidth/2){
                this.slideTo(this.activeIndex-1);
            }
            else if(distance<=-this.slideWidth/2){
                this.slideTo(this.activeIndex+1);
            }
            else this.slideTo(this.activeIndex);
        },
        'touchCancel':function (event) {
            console.info('滑动取消');
            this.slideTo(this.activeIndex);
        },
        'slideTo':function(slideIndex) {
            if(slideIndex>=0&&slideIndex<this.childrenNum){
                this.activeIndex=slideIndex;
                this.swipeEnd(this.activeIndex);
            }
            this.translateX=this.activeIndex*this.slideWidth;
        }
    }
};
</script>
<style scoped>
    .container{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
    }
    .container .wrapper{
        transform: translateX(0);
        -webkit-transition: all 500ms ease;
        -moz-transition: all 500ms ease;
        transition: all 500ms ease;
    }
    .wrapper .slide{
        display:inline-block;
        min-width: 100%;
    }
</style>


