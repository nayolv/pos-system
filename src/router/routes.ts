import { Dashboard } from "../pages/Dashboard/Dashboard";
import { ReadyOrders } from "../pages/Dashboard/Jobs/Waiter/ReadyOrders";
import { Home } from "../pages/Home/Home";
import Redirect from "../pages/Redirect/Redirect";

const routes = [
    { path: '/', component: Home, isProtected: false },
    { path: '/dashboard', component: Dashboard, isProtected: true },
    { path: '/ready-orders', component: ReadyOrders, isProtected: true },
    { path: '*', component: Redirect, isProtected: false },
];

export default routes