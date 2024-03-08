import { QueryClient, QueryClientProvider } from "react-query";
import Todo from "./Todo";
const queryClient = new QueryClient();
function App() {
  return <QueryClientProvider client={queryClient}>
    <Todo />
  </QueryClientProvider>
}

export default App
