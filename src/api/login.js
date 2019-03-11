import request from '@/utils/request'
// import service from '@/utils/request'//尝试使用service.request

export function login(username, password) {
  return request({
    url: '/auth',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// export function getInfo(token) {
//   return request({
//     url: 'api/v1/userinfo',
//     method: 'get',
//     params: { token }
//   })
// }

export function getInfo() {
  return request({
    url: '/api/v1/userinfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
