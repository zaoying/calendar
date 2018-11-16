<template>
    <a class = "button" :href = "href" @click = "callback">
        <slot></slot>
    </a>
</template>
<script>
export default {
    props: ['href', 'callback']
}
</script>
<style scoped>
    .button{
        display: inline-block;
        padding: 2% 3%;
        border: 1px solid #aaa;
        border-radius: 1%;
        text-decoration: none;
    }
    .button > *{
        vertical-align: middle;
    }
</style>

