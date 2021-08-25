export const rules = {
  phone: [
    {
      required: true,
      message: '手机号码是必须内容',
      trigger: 'blur'
    },
    {
      pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
      message: '手机号码格式不正确',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码是必传内容~',
      trigger: 'blur'
    }
  ]
}
