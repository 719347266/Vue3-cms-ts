<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="datacount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler v-if="isCreate">
        <el-button type="primary" size="medium" @click="handleNewClick"
          >新建用户</el-button
        >
      </template>
      <template #status="scope">
        <span>{{ scope.row.enable === 1 ? '开启' : '关闭' }}</span>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 在表格中 动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import hyTable from '@/base-ui/table'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    propsName: {
      type: String,
      required: true
    }
  },
  components: {
    hyTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    const isCreate = usePermission(props.propsName, 'create')
    const isDelete = usePermission(props.propsName, 'delete')
    const isUpdate = usePermission(props.propsName, 'update')
    const isQuery = usePermission(props.propsName, 'query')
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })

    watch(pageInfo, () => getPageData())

    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.propsName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }

    getPageData()

    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.propsName)
    )

    const datacount = computed(() =>
      store.getters[`system/pageCountData`](props.propsName)
    )

    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (
          item.slotName === 'status' ||
          item.slotName === 'createAt' ||
          item.slotName === 'updateAt' ||
          item.slotName === 'handler'
        ) {
          return false
        }
        return true
      }
    )

    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.propsName,
        id: item.id
      })
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }

    return {
      dataList,
      datacount,
      pageInfo,
      getPageData,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      isQuery,
      handleEditClick,
      handleDeleteClick,
      handleNewClick
    }
  }
})
</script>

<style lang="less" scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
