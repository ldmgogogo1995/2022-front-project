/*
 * @Author: ldm
 * @Date: 2021-12-20 22:50:33
 * @LastEditors: ldm
 * @LastEditTime: 2022-03-21 22:22:14
 * @Description: 路由管理
 */
interface routeType {
  name?: string;
  key: string;
  children?: Array<routeType>;
}

export const routes: routeType[] = [
  {
    key: 'Authority',
    name: 'menu.authority',
    children: [
      {
        name: 'menu.authority.userManagement',
        key: 'Authority/UserManagement',
      },
      {
        name: 'menu.authority.roleManagement',
        key: 'Authority/RoleManagement',
      },
      {
        name: 'menu.authority.postManagement',
        key: 'Authority/PostManagement',
      },
    ],
  },
];
export const defaultRoute = 'Authority/UserManagement';