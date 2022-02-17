/*
 * @Descripttion:
 * @version: 
 * @Author: 
 * @Date: 2022-01-23 13:28:21
 * @LastEditors: 𝒜𝒽𝑜𝓁𝒾𝒸.
 * @LastEditTime: 2022-01-24 11:07:02
 */

import {Request} from '../utils/request'

// 发送身高体重
export function sendUserInfo(data) {
    console.log(data)
  return Request({
    url: '/miniprograms/report/infoSave',
    method: 'POST',
    data
  })
}


// 获取营养报告
export function loadReport() {
    return Request({
      url: '/miniprograms/report/conclusion',
      method: 'GET'
    })
  }


// 推荐食材
export function loadFoodRecommend() {
  return Request({
    url: '/miniprograms/report/recommend',
    method: 'GET'
  })
}

// 维生素和矿物质
export function loadElement() {
  return Request({
    url: '/miniprograms/report/mineral',
    method: 'GET'
  })
}