import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster
        richColors
        toastOptions={{
          className: "max-w-xs break-words text-center ",
        }}
        className="toaster-custom-width"
      />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
