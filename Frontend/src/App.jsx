import { Outlet } from "react-router";
import "./styles/index.css";
import "./styles/login.css";

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
