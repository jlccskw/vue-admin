import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/v1/articles', //api前面要加上斜杠，否则会出现页面的path地址加到api之前进行请求
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/api/v1/article/' + id,
    method: 'get'
  })
}


export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
