// import axios, { AxiosError, AxiosRequestConfig } from 'axios'
// import { enumToArray } from './validators'

// import {
//   getTicketMasterConfigGQL,
//   getEventbriteConfig,
//   getTwitchConfig
// } from '../searches'
// import {
//   IGeneralRequestParams,
//   ESearchTypes,
//   ESearchParameters
// } from '../../interfaces'

// const GLOBAL_HEADERS = {
//   'User-Agent':
//     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36 Edg/90.0.818.62',
//   Accept: '*/*',
//   'Accept-Encoding': 'gzip, deflate, br'
// }

// export class QueryBuilder {
//   public parameters: IGeneralRequestParams = { keyword: [] }

//   public add(field: ESearchParameters, value: string) {
//     if (field === ESearchParameters.KEYWORD) {
//       this.parameters[ESearchParameters.KEYWORD] = [
//         ...this.parameters[ESearchParameters.KEYWORD],
//         value
//       ]
//     } else {
//       this.parameters[field] = value
//     }
//   }

//   public async searchOne(source: string) {
//     const _search = async (config: AxiosRequestConfig) => {
//       config.headers = { ...config.headers, ...GLOBAL_HEADERS }
//       console.log('tm headers ', config)
//       const { data, status } = await axios(config).catch((e: AxiosError) => {
//         let error = { data: {}, status: 400 }
//         if (e.response) {
//           error.data = e.response.data
//           error.status = e.response.status
//         }
//         return error
//       })
//       return { data, status }
//     }

//     switch (source) {
//       case ESearchTypes.TICKET_MASTER:
//         return _search(await getTicketMasterConfigGQL(this.parameters))
//       case ESearchTypes.EVENTBRITE:
//         return _search(await getEventbriteConfig(this.parameters))
//       case ESearchTypes.TWITCH:
//         return _search(await getTwitchConfig(this.parameters))
//       default:
//         return { data: {}, status: 400 }
//     }
//   }

//   public async searchAll() {
//     Promise.allSettled(
//       enumToArray(ESearchTypes).map(source => {
//         return this.searchOne(source)
//       })
//     ).then(results => results)
//   }
// }
