import {Request} from '../utils/request'

// 注册
export function register(data) {
  return Request({
    url: '/miniprograms/login/register',
    method: 'POST',
    data
  })
}
// 登录
export function login(data) {
  return Request({
    url: '/miniprograms/login/login',
    method: 'POST',
    data
  })
}
