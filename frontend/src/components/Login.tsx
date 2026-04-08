import { login } from "../api/authApi";
import type { LoginRequest } from "../types/LoginRequest";
import { useRef } from "react";

const Login = () => {
  const emilRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await login({
        email: emilRef.current?.value || "",
        password: passwordRef.current?.value || "",
      } as LoginRequest);
      // console.log(`Login user: ${user.token}`);
      localStorage.setItem("token", user.token);
    } catch (error) {
      const err = error as { cleanMessage?: string };
      console.log(`Login error: ${err.cleanMessage}`);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" placeholder="Username" ref={emilRef} />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        ref={passwordRef}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
