<template>
    <div class="container">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name:'carousel'
}
</script>
<style scoped>
    .container{
        width: 100%;
        overflow-x: scroll;
        white-space: nowrap;
    }
    .container .slide{
        display:inline-block;
        min-width: 100%;
    }
</style>


