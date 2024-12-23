import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import DesignerContextProvider from "./contexts/DesignerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DesignerContextProvider>
          <App />
        </DesignerContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
