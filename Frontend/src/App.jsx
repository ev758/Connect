import { Outlet } from "react-router";
import "./styles/index.css";
import "./styles/login.css";
import "./styles/home.css";
import "./styles/profile.css";

function App() {
  return (
    <>
      <div>
        <Outlet/>
      </div>
    </>
  );
}

export default App;
