import { Employees } from "../components/Jobs/Admin/Employees";
import { ReadyOrders } from "../components/Jobs/Waiter/ReadyOrders";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Home } from "../pages/Home/Home";
import Redirect from "../pages/Redirect/Redirect";
import Products from "../components/Jobs/Admin/Products";

const routes = [
    { path: '/', component: Home, isProtected: false },
    { path: '/dashboard', component: Dashboard, isProtected: true },
    { path: '/ready-orders', component: ReadyOrders, isProtected: true },
    { path: '/employees', component: Employees, isProtected: true },
    { path: '/products', component: Products, isProtected: true },
    { path: '*', component: Redirect, isProtected: false },
];

export default routes