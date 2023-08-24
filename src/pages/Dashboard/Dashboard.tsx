import { Kitchen } from "@mui/icons-material";
import { Waiter } from "../../components/Jobs/Waiter/Waiter";
import { UserDto } from "../../models/user.model";


export const Dashboard = () => {
    const userJSON = localStorage.getItem("user");
    const user: UserDto = userJSON ? JSON.parse(userJSON) : null;

    return (
        <div className="">  Hay
            {user.role === "waiter" && <Waiter />}
            {user.role === "kitchen" && <Kitchen />}
        </div>
    )
}
