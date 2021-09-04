<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <breadcrumb :breadcrumb="Breadcrumb" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import Breadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    UserInfo,
    Breadcrumb
  },
  setup(props, { emit }) {
    const isFold = ref(false)

    const store = useStore()
    const Breadcrumb = computed(() => {
      const userMenu = store.state.login.userMenus
      const route = useRoute()
      return pathMapBreadcrumbs(userMenu, route.path)
    })

    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    return {
      isFold,
      Breadcrumb,
      handleFoldClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  display: flex;
  align-items: center;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    width: 100%;
    padding-left: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
