<template>
    <div class = "center header">
        <slot></slot>
        <h2 class = "title">{{title}}</h2>
        <p class = "subtitle">{{subtitle}}</p>
    </div>
</template>
<script>
export default {
    name: "header",
    props: ['title', 'subtitle']
}
</script>
<style scoped>
.header{
    padding: 2% 0;
    box-shadow: 1px 1px 4px 1px #CCC;
}
.title{
    margin: 0;
}
.subtitle{
    margin: 0;
    font-size: 0.9em;
    color: grey;
}
</style>

