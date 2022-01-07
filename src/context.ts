/*
 * @Author: ldm
 * @Date: 2021-12-25 00:46:24
 * @LastEditors: ldm
 * @LastEditTime: 2021-12-25 14:24:21
 * @Description: context
 */

import { createContext } from 'react'
export const GlobalContext = createContext<{ locale?: Record<string, string> }>({})