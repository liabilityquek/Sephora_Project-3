import { Routes, Route, Link, useLocation } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import ForgetPassword from "./ForgetPassword";

export default function AuthPage({ setUser }) {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/forgetpassword" && (
        <Link to="/signup">
          <button>New Customer</button>
        </Link>
      )}
      <Link to="/login">
        <button>Log in</button>
      </Link>
      <Link to="/forgetpassword">
        <button>Forget Password</button>
      </Link>
      <Routes>
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </>
  );
}
