import { Route, Routes, useLocation } from 'react-router-dom';
import routes from '../../router/routes';
import Protected from '../Protected/Protected';
import { Sidebar } from '../Sidebar/Sidebar';
import { Box } from '@mui/material';

export default function Layout() {
    const auth = localStorage.getItem('auth');
    const { pathname } = useLocation();

    return (
        <Box sx={{ display: 'flex' }}>
            {pathname !== "/" ?
                <Sidebar />
                :
                null
            }
            <div className={`layout-container ${pathname !== "/" ? "margin-top-component" : ""} `}>
                <Routes>
                    {routes.map((route) =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.isProtected ?
                                <Protected isSignedIn={auth}>
                                    <route.component />
                                </Protected>
                                :
                                <route.component />
                            }
                        />)}
                </Routes>
            </div>
        </Box>
    );
}
