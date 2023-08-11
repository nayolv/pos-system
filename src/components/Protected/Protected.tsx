import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedDto {
  isSignedIn: string | null
  children: ReactNode
}

const Protected: React.FC<ProtectedDto> = ({ isSignedIn, children }) => {
  if (isSignedIn === "false") {
    return <Navigate to="/" replace />
  }
  return children
}


export default Protected