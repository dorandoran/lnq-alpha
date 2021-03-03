import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { enumToArray } from './validators'

import {
  getTicketMasterConfig,
  getEventbriteConfig,
  getTwitchConfig
} from '../searches'
import {
  IGeneralRequestParams,
  ESearchTypes,
  ESearchParameters
} from '../../interfaces'

const GLOBAL_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 Edg/88.0.705.81',
  Accept:
    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
}

export class QueryBuilder {
  public parameters: IGeneralRequestParams = {}

  public add(field: ESearchParameters, value: string) {
    if (field === ESearchParameters.KEYWORD) {
      this.parameters.keyword = this.parameters.keyword
        ? this.parameters.keyword + value
        : value
    } else {
      this.parameters[field as keyof IGeneralRequestParams] = value
    }
  }

  public async searchOne(source: string) {
    const _search = async (config: AxiosRequestConfig) => {
      config.headers = { ...config.headers, ...GLOBAL_HEADERS }
      const { data, status } = await axios(config).catch((e: AxiosError) => {
        let error = { data: {}, status: 400 }
        if (e.response) {
          error.data = e.response.data
          error.status = e.response.status
        }
        return error
      })
      return { data, status }
    }

    switch (source) {
      case ESearchTypes.TICKET_MASTER:
        return _search(await getTicketMasterConfig(this.parameters))
      case ESearchTypes.EVENTBRITE:
        return _search(await getEventbriteConfig(this.parameters))
      case ESearchTypes.TWITCH:
        return _search(await getTwitchConfig(this.parameters))
      default:
        return { message: { data: {}, status: 400 } }
    }
  }

  public async searchAll() {
    Promise.allSettled(
      enumToArray(ESearchTypes).map(source => {
        return this.searchOne(source)
      })
    ).then(results => results)
  }
}
