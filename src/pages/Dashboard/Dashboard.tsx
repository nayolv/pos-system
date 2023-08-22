import { UserDto } from "../../models/user.model";
import Admin from "./Jobs/Admin/Admin";
import { Kitchen } from "./Jobs/Kitchen/Kitchen";
import { Waiter } from "./Jobs/Waiter/Waiter";


export const Dashboard = () => {
    const userJSON = localStorage.getItem("user");
    const user: UserDto = userJSON ? JSON.parse(userJSON) : null;

    return (
        <div className="">
            {user.role === "waiter" && <Waiter />}
            {user.role === "kitchen" && <Kitchen />}
            {user.role === "admin" && <Admin />}
        </div>
    )
}
