import Vue from "vue";
import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

// 中文语言包
dayjs.locale('zh-cn')

// 相对时间
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
