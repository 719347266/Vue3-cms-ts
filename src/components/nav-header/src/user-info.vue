<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="handleSignout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import Localcache from '@/utils/cache'

export default defineComponent({
  setup() {
    const rouer = useRouter()
    const handleSignout = () => {
      console.log(rouer)
      Localcache.deleteCache('token')
      rouer.push('/main')
    }
    return {
      handleSignout
    }
  }
})
</script>

<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
</style>
