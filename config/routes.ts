export default [
  { path: '/', redirect: '/home' },
  { path: '/home', component: './Home' },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
    ],
  },
  {
    path: '/user/center', component: './User/Center'
  },
  {
    path: '/admin',
    name: '管理中心',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { path: '/admin/user', name: '用户管理', icon: 'table', component: './Admin/User' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
