import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUpForm from "./components/forms/SignUpForm";
import SignInForm from "./components/forms/SignInForm";
import { Toaster } from "react-hot-toast";
import Builder from "./pages/Builder";
import Layout from "./components/layouts/Layout";
import useAuth from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />

        {isAuthenticated && (
          <>
            <Route
              path="/builder/:formId"
              element={
                <Layout>
                  <Builder />
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
          </>
        )}
      </Routes>

      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

export default App;
