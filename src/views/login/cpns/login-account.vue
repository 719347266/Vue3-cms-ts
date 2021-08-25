<template>
  <div class="login-account">
    <el-form label-width="70px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, ref, reactive } from 'vue'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    const store = useStore()

    let account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    let formRef = ref<InstanceType<typeof ElForm>>()

    let loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
            localCache.setCache('isKeepPassword', isKeepPassword)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
            localCache.deleteCache('isKeepPassword')
          }
          store.dispatch('login/accountLoginAction', account)
        }
      })
    }

    return {
      account,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style></style>
