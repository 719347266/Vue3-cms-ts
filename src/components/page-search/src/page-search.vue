<template>
  <div>
    <hyform v-bind="searchFormConfig" v-model="formDate">
      <template #hander>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryClick"
            >搜索</el-button
          >
        </div>
      </template>
    </hyform>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Hyform from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true
    }
  },
  components: {
    Hyform
  },
  emits: ['queryBtnClick', 'resetBtnClick'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formDate = ref(formOriginData)

    const handleResetClick = () => {
      for (const key in formOriginData) {
        formDate.value[`${key}`] = formOriginData[key]
      }
      emit('resetBtnClick')
    }

    const handleQueryClick = () => {
      emit('queryBtnClick', formDate.value)
    }
    return {
      formDate,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style lange="less" scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
