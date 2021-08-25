<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
import localCache from '@/utils/cache'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    let isKeepPassword = ref(localCache.getCache('isKeepPassword') ?? false)
    let accountRef = ref<InstanceType<typeof LoginAccount>>()
    let phoneRef = ref<InstanceType<typeof LoginPhone>>()
    let currentTab = ref<string>('account')

    let handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phone验证')
      }
    }

    let onTab = (e: any) => {
      console.log(e)
    }

    return {
      handleLoginClick,
      isKeepPassword,
      accountRef,
      currentTab,
      phoneRef,
      onTab
    }
  }
})
</script>

<style lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
