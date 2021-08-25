<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phone" ref="formRef">
      <el-form-item label="手机" prop="phone">
        <el-input v-model="phone.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input v-model="phone.code" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { rules } from '../config/phone-config'
export default defineComponent({
  setup() {
    let phone = ref({
      phone: '',
      code: ''
    })

    return {
      phone,
      rules
    }
  }
})
</script>

<style lang="less">
.login-phone {
  .get-code {
    display: flex;
    .get-btn {
      margin-left: 8px;
    }
  }
}
</style>
