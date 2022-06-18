/*
 * @Description:检查是否为登陆状态
 * @Version: 1.0
 * @Autor: ldm
 * @Date: 2022-03-06 02:35:30
 * @LastEditors: ldm
 * @LastEditTime: 2022-03-06 02:35:31
 */
export default function checkLogin() {
  return localStorage.getItem('userStatus') === 'login';
}
