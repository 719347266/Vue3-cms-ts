<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      propsName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <el-tree
        ref="elTreeRef"
        :data="menus"
        :props="{ children: 'children', label: 'name' }"
        node-key="id"
        show-checkbox
        @check="handleChekChange"
      >
      </el-tree>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import PageModal from '@/components/page-modal'
import { modalConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'role',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      console.log(item, 'itemitemitemitem')

      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef, 'elTreeRef')

        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    const [pageModalRef, handleNewData, handleEditData, defaultInfo] =
      usePageModal(undefined, editCallback)

    const otherInfo = ref({})
    const handleChekChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    const store = useStore()

    const menus = computed(() => store.state.entireMenu)

    return {
      searchFormConfig,
      contentTableConfig,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo,
      modalConfig,
      menus,
      otherInfo,
      handleChekChange,
      elTreeRef
    }
  }
})
</script>

<style scoped></style>
