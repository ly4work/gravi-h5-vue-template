/**
 * routeConfig
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export default [
  {
    path: "/welcome",
    component: () => import("@/views/welcome/index"),
    hidden: true,
  },

  {
    path: "/",
    redirect: "/welcome",
  },
  {
    path: "/index",
    component: () => import("@/views/index/index"),
    children: [
      {
        path: "/index/home",
        component: () => import("@/views/index/home/index"),
        meta: { title: "首页", affix: false },
      },
      {
        path: "/index/cashier",
        component: () => import("@/views/index/cashier/index"),
        // hidden: true,
        meta: { title: "收银台", affix: false },
      },
      {
        path: "/index/tab-picker",
        component: () => import("@/views/index/tab-picker/index"),
        // hidden: true,
        meta: { title: "频道选择", affix: false },
      },
      {
        path: "/index/charts",
        component: () => import("@/views/index/charts/index"),
        // hidden: true,
        meta: { title: "图表", affix: false },
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
  },
  {
    path: "/error",
    component: () => import("@/views/error/index"),
    children: [
      {
        path: "404",
        name: "404",
        component: () => import("@/views/error/404"),
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
