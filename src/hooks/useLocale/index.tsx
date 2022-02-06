import { GlobalContext } from '@/context';
import { useContext } from 'react';
import defaultLocale from '@/locale';
const useLocale = (locale = null) => {
  const { lang } = useContext(GlobalContext);
  return (locale || defaultLocale)[lang] || {};
};

export default useLocale;
