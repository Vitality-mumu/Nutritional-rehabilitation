/*
 * @Descripttion:
 * @version: 
 * @Author: 
 * @Date: 2022-01-23 13:28:21
 * @LastEditors: ππ½πππΎπΈ.
 * @LastEditTime: 2022-01-24 11:07:02
 */

import {Request} from '../utils/request'

// ειθΊ«ι«δ½ι
export function sendUserInfo(data) {
    console.log(data)
  return Request({
    url: '/miniprograms/report/infoSave',
    method: 'POST',
    data
  })
}


// θ·εθ₯ε»ζ₯ε
export function loadReport() {
    return Request({
      url: '/miniprograms/report/conclusion',
      method: 'GET'
    })
  }


// ζ¨θι£ζ
export function loadFoodRecommend() {
  return Request({
    url: '/miniprograms/report/recommend',
    method: 'GET'
  })
}

// η»΄ηη΄ εηΏη©θ΄¨
export function loadElement() {
  return Request({
    url: '/miniprograms/report/mineral',
    method: 'GET'
  })
}