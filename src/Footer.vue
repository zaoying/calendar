<template>
    <div class = "footer">
        <slot>
            <h2 class = "center">Footer</h2>
        </slot>
    </div>
</template>
<script>
export default {
    name: 'footer'
}
</script>
<style scoped>
    .footer{
        box-shadow: -1px -1px 4px 1px #CCC;
    }
</style>

