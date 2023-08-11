import { useNavigate } from "react-router-dom";
import { UserDto } from "../models/user.model";

export const useAuth = () => {
  const navigate = useNavigate();

  const signin = (user: UserDto) => {
    navigate("/dashboard");
    localStorage.setItem("auth", "true");
    localStorage.setItem("user", JSON.stringify(user))
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