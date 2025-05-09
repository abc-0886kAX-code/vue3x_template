/*
 * @FilePath: /vue3x_template/src/pages/home/server/index.js
 * @Author: zhangxin
 * @Date: 2024-01-25 16:20:55
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2025-05-09 13:51:55
 * @Description: request示例
 */
import { Address, Method } from './config'
import { useService } from '@/service/Application'
import { transFormData } from '~/shared/trans'

function generateHydroData(num) {
  const stations = ['长江', '黄河', '珠江', '松花江', '淮河', '太湖', '鄱阳湖', '洞庭湖']
  const dataTypes = ['水位', '流速', 'PH值', '浊度', '溶解氧', '氨氮', 'COD', 'BOD']
  const methods = ['均值修正', '中值滤波', '数据插补', '阈值修正', '人工修正', '回归修正', '平滑处理']

  return Array.from({ length: num }, (_, i) => ({
    stnm: `${stations[i % stations.length]}${i % 5 + 1}号站`,
    sttp: dataTypes[i % dataTypes.length],
    o_z: (Math.random() * 20 + 1).toFixed(2),
    comments: methods[i % methods.length],
    tm: new Date(2025, 4, 8, 8 + i % 10, i % 60, i % 60)
      .toISOString().replace('T', ' ').substring(0, 19),
    z: (Math.random() * 19 + 1).toFixed(2),
  }))
}

const service = useService()
function transResponse(response) {
  // const data = get(response, 'data.data', [])

  return { data: generateHydroData(100) }
}

export const Home_Server = service.define({
  url: Address,
  method: Method,
})

export function Home_Obtain(props) {
  Home_Server.server.config.bind('params', transFormData(props))
  return Home_Server.obtain({ transResponse })
}

export default Home_Server
