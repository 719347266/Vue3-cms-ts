<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import LoginPanel from './cpns/login-panel.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    LoginPanel
  }
})
</script>

<style lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
