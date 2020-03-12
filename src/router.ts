import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import NewTradeWith from "./views/NewTradeWith.vue";
import NewTradeFor from "./views/NewTradeFor.vue";
import Trade from "./views/Trade.vue";
import AllTrades from "./views/AllTrades.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home,
            name: "Home"
        },
        {
            path: "/trade/new",
            component: NewTradeWith,
            name: "NewTradeWith"
        },
        {
            path: "/trade/new/:user",
            component: NewTradeFor,
            name: "NewTradeFor"
        },
        {
            path: "/trade/",
            component: AllTrades,
            name: "AllTrades"
        },
        {
            path: "/trade/:id",
            component: Trade,
            name: "Trade"
        }
    ]
})

export default router;
