import request from '@/utils/request'

export function getbaseinfo(data) {
  console.log("获取集群基础信息:",data)
  return request({
    url: '/lego/cluster/baseinfo',
    method: 'post',
    data
  })
}