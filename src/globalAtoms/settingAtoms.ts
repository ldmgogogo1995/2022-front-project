import defaultSettings from '../settings.json';
import { atom } from 'recoil';
const GLOBAL_SETTINGS_KEY = 'GLOBAL_SETTINGS'
// 全局设置参数状态
export const settingsAtom = atom({
    key:GLOBAL_SETTINGS_KEY,
    default:defaultSettings
})
