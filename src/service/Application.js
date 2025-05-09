/*
 * @FilePath: /vue3x_template/src/service/Application.js
 * @Author: maggot-code
 * @Date: 2022-11-24 10:05:30
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2025-05-09 13:48:07
 * @Description:
 */
import axios from 'axios'
import { defineService } from '~/service'
import { useTokenMiddleware } from '@/middleware/token.request'

const baseURL = import.meta.env.VITE_API_BASE_URL_PRE

const define = axios.create({
  baseURL,
  timeout: import.meta.env.DEV ? 0 : 30000,
})

function transResponse(response) {
  return get(response, 'data.data', {})
}

const service = defineService(define, { transResponse })

useTokenMiddleware(define)

export function useService() {
  return defineService(define, { transResponse })
}

export default service
