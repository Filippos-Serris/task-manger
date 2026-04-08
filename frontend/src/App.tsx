import "./App.css";
import axiosInstance from "./api/axios";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";

function App() {
  const testToken = async () => {
    localStorage.setItem("token", "your_jwt_token_here");

    try {
      const response = await axiosInstance.get("/tasks");
      console.log(response.data);
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  const testError = async () => {
    localStorage.removeItem("token");

    try {
      await axiosInstance.get("/tasks");
    } catch (error) {
      const err = error as { cleanMessage?: string };
      console.log(`Clean message: ${err.cleanMessage}`);
    }
  };

  return (
    <>
      <h1>Task Manager</h1>
      <button onClick={testToken}>Token</button>
      <button onClick={testError}>Error</button>

      <Login />
      <RegisterUser />
    </>
  );
}

export default App;
