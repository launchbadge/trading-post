import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import NewTrade from "./views/NewTrade.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home,
            name: "Home"
        },
        {
            path: "/trade",
            component: NewTrade,
            name: "NewTrade"
        }
    ]
})

export default router;
