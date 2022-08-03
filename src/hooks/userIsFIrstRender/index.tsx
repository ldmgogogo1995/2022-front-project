/*
 * @Description: 判断是否是第一次渲染 hook
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-08-04 00:53:03
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-04 01:01:07
 */

import { useRef } from 'react';

function useIsFirstRender(): boolean {
  const isFirst = useRef<boolean>(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return isFirst.current;
}
export default useIsFirstRender;
