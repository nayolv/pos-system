import { Link } from "react-router-dom";
import './header.scss'
import { UserDto } from "../../models/user.model";
import { Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";


export const Header: React.FC = () => {


  const { signout } = useAuth();
  const userJSON = localStorage.getItem("user");
  const user: UserDto = userJSON ? JSON.parse(userJSON) : null;

  const headerByRole: { [key: string]: JSX.Element } = {
    waiter: <ul className="navbar-nav">
      <li className="nav-item active">
        <Link to={"/dashboard"}>Menú</Link>
      </li>
      <li className="nav-item">
        <Link to={"/ready-orders"}>Ordenes listas</Link>
      </li>
    </ul>,
    kitchen:
      <ul className="navbar-nav">
        <li className="nav-item active">
          <Link to={"/dashboard"}>Ordenes en curso</Link>
        </li>
      </ul>,
    admin: <ul className="navbar-nav">
      <li className="nav-item active">
        <Link to={"/dashboard"}>Usuarios</Link>
      </li>
    </ul>

  }


  return (
    <nav className="navbar navbar-expand-lg  header-container">
      {
        /* <a className="navbar-brand" href="#">Logo</a> */
      }

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse menu-container" id="navbarNav">
        {headerByRole[user.role]}
      </div>
      <Button variant="text" onClick={() => signout()}>Cerrar sesión</Button>

    </nav>
  );
}