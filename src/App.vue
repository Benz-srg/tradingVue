<template>
  <div>
    <header-block />
    <router-view />
  </div>
</template>

<script>
import HeaderBlock from '@/components/Header'
export default {
  name: 'Home',
  components: {
    HeaderBlock
  }
}
</script>

<style>
@import "./assets/css/styles.min.css";
.color-up {
  color: var(--bs-green);
}
.color-down {
  color: var(--bs-red);
}
</style>
