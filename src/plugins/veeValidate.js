import { defineRule, configure } from 'vee-validate'
import { all } from '@vee-validate/rules'
import { setLocale, localize } from '@vee-validate/i18n'
configure({
  generateMessage: localize('zh-TW', {
    messages: {
      required: '必填',
      email: 'email格式不符',
      confirmed: '需與密碼相同',
    },
  }),
})
setLocale('zh-TW')
Object.entries(all).forEach(([name, rule]) => {
  defineRule(name, rule)
})
