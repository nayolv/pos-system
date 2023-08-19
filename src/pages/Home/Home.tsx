import { Login } from "../../components/Login/Login"
import { login } from "../../api/login"
import { useQuery } from "@tanstack/react-query"
import './home.scss'

export const Home = () => {
  const usersQuery = useQuery(['users'], login);

  return (
    <div className="home-container container-fluid d-flex justify-content-center flex-column">
      <Login users={usersQuery.data} />
    </div>
  )
}
