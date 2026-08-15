import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import { useAuthStore } from "./stores/auth/authStore";
import { useInitAuth } from "./hooks/auth/useInitAuth";

function App() {
  const isInitialized = useAuthStore((state) => state.isInitialized);
  useInitAuth();

  if (!isInitialized) return null;
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
