import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from "./components/Layout/Layout";
const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Layout />
      </main>
    </QueryClientProvider>
  )
}

export default App
