<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @queryBtnClick="handleQueryClick"
      @resetBtnClick="handleResetClick"
    ></page-search>

    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      propsName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>

    <page-modal
      ref="pageModalRef"
      pageName="users"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    const store = useStore()
    // store.dispatch('getInitialDataAction')

    // 计算属性 解决接口异步延迟的问题 数据更改重新计算
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    const [pageModalRef, handleNewData, handleEditData, defaultInfo] =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      modalConfig,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultInfo,
      modalConfigRef
    }
  }
})
</script>

<style lang="less" scoped></style>
