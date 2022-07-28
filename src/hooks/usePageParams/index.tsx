/*
 * @Description: 分页请求hook封装
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-01-09 05:45:48
 * @LastEditors: ldm
 * @LastEditTime: 2022-07-28 01:43:33
 */
import { useEffect, useState } from 'react';

export interface InitPageParmas {
  pageSize: number;
  current: number;
}
type PageParamsCallBack = (pageParams: InitPageParmas) => void;
const usePageParams = (
  initPageParmas = { current: 1, pageSize: 10 },
  cb: PageParamsCallBack,
  deps = []
): [InitPageParmas, React.Dispatch<React.SetStateAction<InitPageParmas>>] => {
  const [pageParams, setPageParams] = useState<InitPageParmas>(initPageParmas);

  useEffect(() => {
    cb?.(pageParams);
  }, [pageParams, ...deps]);

  return [pageParams, setPageParams];
};

export default usePageParams;
