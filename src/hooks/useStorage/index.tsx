import { isSSR } from '@/utils/is';
import { useEffect, useState } from 'react';

const getDefaultStorage = (key: string) => {
  if (!isSSR) {
    return localStorage.getItem(key);
  } else {
    return undefined;
  }
};
const useStorage = (key: string, defaultValue=''): [string, (val:string) => void, () => void] => {
  const [storedValue, setStoredValue] = useState<string>(getDefaultStorage(key) || defaultValue);

  /**
   * 设置storage value
   */
  const setStorageValue = (value: string) => {
    if (!isSSR) {
      localStorage.setItem(key, value);
      if (value !== storedValue) {
        setStoredValue(value);
      }
    }
  };

  /**
   * 删除 storage value
   */
  const removeStoregeValue = () => {
    localStorage.removeItem('key');
  };

  useEffect(() => {
    const storageValue = localStorage.getItem(key);
    if (storageValue) {
      setStoredValue(storageValue);
    }
  }, []);
  return [storedValue, setStorageValue, removeStoregeValue];
};

export default useStorage;
