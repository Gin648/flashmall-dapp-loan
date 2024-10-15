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
  }
];

export default routes;
