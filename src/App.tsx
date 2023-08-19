import { Route, Routes, useLocation } from "react-router-dom"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import routes from "./router/routes"
import Protected from "./components/Protected/Protected"
import { Header } from "./components/Header/Header";
const queryClient = new QueryClient()

function App() {

  const auth = localStorage.getItem('auth');
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      {
        location.pathname !== '/' ?
          <header>
            <Header />
          </header>
          :
          <></>
      }
      <main>
        <Routes>
          {
            routes.map((route) =>
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
              />
            )}
        </Routes>
      </main>
      {/* <footer>
      </footer> */}
    </QueryClientProvider>
  )
}

export default App
