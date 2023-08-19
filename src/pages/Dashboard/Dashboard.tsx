import { UserDto } from "../../models/user.model";
import Admin from "./Jobs/Admin/Admin";
import { Kitchen } from "./Jobs/Kitchen/Kitchen";
import { Waiter } from "./Jobs/Waiter/Waiter";

export const Dashboard = () => {
    const user = localStorage.getItem("user");
    const userJSON: UserDto = user != null ? JSON.parse(user) : {}

    return (
        <div>
            {userJSON.role === "waiter" && <Waiter />}
            {userJSON.role === "kitchen" && <Kitchen />}
            {userJSON.role === "admin" && <Admin />}
        </div>
    )
}
