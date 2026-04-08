import type { RegisterRequest } from "../types/RegisterRequest";
import { register } from "../api/authApi";
import { useRef } from "react";

const RegisterUser = () => {
  const fullnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleRegister = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullname = fullnameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      await register({ fullname, email, password } as RegisterRequest);
    } catch (error) {
      const err = error as { cleanMessage?: string };
      console.log(`Register error: ${err.cleanMessage}`);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <label htmlFor="fullname">Full name</label>
      <input type="text" id="fullname" ref={fullnameRef} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" ref={emailRef} />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" ref={passwordRef} />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterUser;
