<template>
    <div class = "container" @touchstart = "touchStart($event)" @touchmove = "touchMove($event)" 
    @touchend = "touchEnd($event)" @touchcancel = "touchCancel($event)">
        <div class = "wrapper" :style = "style">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import {throttle} from './util.js';
export default {
    name: 'carousel',
    data(){
        return {
            translateX: 0,
            position: this.initIndex,
            style: {
                transform: 'translateX(0)'
            }
        };
    },
    mounted() {
        this.childrenNum = this.$children.length;
        this.slideWidth = this.$el.clientWidth;
        this.slideTo(this.position);
    },
    updated() {
        this.childrenNum = this.$children.length;
        this.slideWidth = this.$el.clientWidth;
    },
    props: {
        'initIndex': {
            type: Number,
            default: 0
        },
        'swipeEnd': {
            type: Function,
            default: function () {
                return function (index) {
                    this.position = index;
                };
            }
        }
    },
    watch: {
        'initIndex': function (val, old) {
            this.slideTo(val);
        },
        'translateX': function (val, old) {
            this.style = {
                transform: 'translateX(' + ( 0 - this.translateX) + 'px)'
            };
        }
    },
    methods: {
        'touchStart': function (event) {
            this.copyTranslateX = this.translateX;
            this.startX = event.touches[0].pageX;
        },
        'touchMove': function (event) {
            if(this.onTouchMove){
                this.onTouchMove.apply(this, [event]);
            }
            else this.onTouchMove = throttle(function(event){
                this.endX = event.touches[0].pageX;
                var distance = this.startX - this.endX;
                if(this.endX >= 0 && this.endX <= this.slideWidth){
                    this.translateX = distance + this.copyTranslateX;
                }
            }, 100);
        },
        'touchEnd': function (event) {
            this.endX = event.changedTouches[0].pageX;
            var distance = this.endX - this.startX;
            if(distance >= this.slideWidth / 2){
                this.slideTo(this.position - 1);
            }
            else if(distance <= -this.slideWidth / 2){
                this.slideTo(this.position + 1);
            }
            else this.slideTo(this.position);
        },
        'touchCancel': function (event) {
            this.slideTo(this.position);
        },
        'slideTo': function(slideIndex) {
            this.position = slideIndex;
            this.swipeEnd(slideIndex);
            this.translateX = this.position * this.slideWidth;
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
        position: relative;
        height: 100%;
        transform: translateX(0);
        -webkit-transition: transform 500ms ease;
        -moz-transition: transform 500ms ease;
        transition: transform 500ms ease;
    }
    .wrapper .slide{
        position: absolute;
        z-index: 9;
        display: inline-block;
        top: 0;
        height: 100%;
        width: 100%;
    }
</style>


