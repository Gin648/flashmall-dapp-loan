import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "root",
    redirect: { name: "LpPledge" },
    children: [
      {
        path: "lp-pledge",
        name: "LpPledge",
        component: () => import("@/views/LpPledge/index.vue"),
        meta: {
          title: "lp质押"
        }
      }
    ]
  },
  {
    path: "/ecology-loan",
    name: "ecology-loan",
    meta: {
      title: "借贷",
      tabBarShow: true
    },
    component: () => import("@/views/loan/index.vue")
  }
];

export default routes;
