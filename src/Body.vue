<template>
  <div class = "body">
    <slot>
        <h1>Body</h1>
    </slot>
  </div>
</template>
<script>
export default {
    name: 'body'
}
</script>
<style scoped>
    .body{
        padding: 2% 1%;
    }
</style>


