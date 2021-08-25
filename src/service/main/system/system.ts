import hyRequest from '@/service/index'

import { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

// url: /users/id
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
