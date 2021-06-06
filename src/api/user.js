import request from '../utils/requset'

// 登录注册
export const login = data => {
  return request({
    method: 'POST',
    // url: '/mp/v1_0/authorizations',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码
export const sendSma = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}

// 获取登录用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取用户频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
