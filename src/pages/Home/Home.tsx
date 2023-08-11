import { useEffect, useState } from "react"
import { Login } from "../../components/Login/Login"
import './home.scss'
import { login } from "../../api/login"
import { UserDto } from "../../models/user.model"

export const Home = () => {
  const [users, setUsers] = useState<UserDto[]>([]);

  const loginFn = async () => {
    try {
      const data = await login();
      setUsers(data)
    } catch (err) {
      console.warn(err)
    }
  };

  useEffect(() => {
    loginFn()
  }, []);
  
  return (
    <div className="home-container container-fluid d-flex justify-content-center flex-column">
      <Login users={users} />
    </div>
  )
}
