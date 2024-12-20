import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./components/forms/SignUpForm";
import SignInForm from "./components/forms/SignInForm";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./contexts/AuthContext";
import Builder from "./pages/Builder";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        {isAuthenticated && (
          <>
            <Route path="/builder/:formId" element={<Builder />} />
            <Route path="/" element={<Home />} />
          </>
        )}
      </Routes>

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
