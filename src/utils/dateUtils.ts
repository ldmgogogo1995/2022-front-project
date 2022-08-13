/*
 * @Description: 时间处理工具函数
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-08-07 02:17:30
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-07 02:36:12
 */
import D from 'dayjs';

/**
 * @description: 格式化时间戳
 * @return {*}
 * @author: ldm
 */
export const dateFormat = (timestamp: number, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  return D(+timestamp).format(format);
};
