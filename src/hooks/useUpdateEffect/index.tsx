/*
 * @Description: 自定义初次不执行，近根据依赖项执行的effect
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-08-04 00:45:47
 * @LastEditors: ldm
 * @LastEditTime: 2022-08-04 01:04:17
 */

import { useEffect, EffectCallback, DependencyList } from 'react';
import useIsFirstRender from '../userIsFIrstRender';

const useUpdateEffect = (effect: EffectCallback, deps: DependencyList) => {
  const isFirst = useIsFirstRender();

  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
  }, deps);
};
export default useUpdateEffect;
