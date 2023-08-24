import { useNavigate } from "react-router-dom";
import { UserDto } from "../models/user.model";
import { ADMIN } from "../constants/constants";

export const useAuth = () => {
  const navigate = useNavigate();

  const signin = (user: UserDto) => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("user", JSON.stringify(user))
    if (user.role === ADMIN) return navigate("/employees")
    navigate("/dashboard");
  }

  const signout = () => {
    localStorage.setItem("auth", "false");
    navigate("/");
  }

  return {
    signin,
    signout,
  }
}