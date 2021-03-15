/**
 * routeConfig
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export default [
  {
    path: "/welcome",
    component: () => import("@/views/welcome/Index"),
    hidden: true,
  },
  {
    path: "/cashier",
    component: () => import("@/views/cashier/Index"),
    hidden: true,
    meta: { title: "收银台", affix: false },
  },
  {
    path: "/",
    redirect: "/welcome",
  },
  {
    path: "/index",
    component: () => import("@/views/index/Index"),
  },
  {
    path: "/login",
    component: () => import("@/views/login/Index"),
  },
  {
    path: "/error",
    component: () => import("@/views/error/Index"),
    children: [
      {
        path: "404",
        name: "404",
        component: () => import("@/views/error/404/Index"),
      },
    ],
  },
  //   {
  //     path: "/home",
  //     component: Layout,
  //     redirect: "/dashboard",
  //     children: [
  //       {
  //         path: "dashboard",
  //         name: "Dashboard",
  //         component: () => import("@/views/dashboard/index"),
  //         meta: { title: "首页", icon: "home", affix: true },
  //       },
  //     ],
  //   },
  //   {
  //     path: "/changePassword",
  //     component: Layout,
  //     children: [
  //       {
  //         path: "index",
  //         name: "ChangePassword",
  //         component: () => import("@/views/changePassword/index"),
  //         meta: { title: "修改密码", affix: false },
  //       },
  //     ],
  //   },
];
