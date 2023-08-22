import { Button } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { UserDto } from '../../models/user.model';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import './header.scss'

const section = {
  waiter: "Meseros",
  kitchen: "Cocina",
  admin: "Administrador"
}

export const Header: React.FC = () => {
  const { signout } = useAuth();
  const userJSON = localStorage.getItem("user");
  const user: UserDto = userJSON ? JSON.parse(userJSON) : null;

  return (
    <header className="d-flex header-container align-items-center">
      <div className='w-50'>
        <h2>
          {section[user.role]}
        </h2>
      </div>
      <div className='w-50 text-end'>
        <p className='m-0 p-0'>
          <PersonRoundedIcon className='icon-table' />
          {user.firstName}{" "}{user.lastName}
        </p>
        <Button className="p-0 m-0" variant="text" onClick={() => signout()}>Salir</Button>
      </div>
    </header >
  );
}