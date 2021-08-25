export const contentTableConfig = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: 100, slotName: 'name' },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: 100,
      slotName: 'realname'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      minWidth: 100,
      slotName: 'cellphone'
    },
    { prop: 'enable', label: '状态', minWidth: 100, slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', slotName: 'handler', minWidth: 120 }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
