import request from '@/utils/request'

export function login(data) {
  console.log("请求登陆:",data)
  return request({
    url: '/lego/user/login',
    method: 'post',
    data
  })
}


export function logout() {
  return request({
    url: '/lego/user/logout',
    method: 'post'
  })
}
