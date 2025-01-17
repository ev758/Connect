import { Outlet } from "react-router";

function LoginLayout() {
  return (
    <>
      <div>
        <h1 className="title"><b>Connect</b></h1>
        
        <Outlet/>
      </div>
    </>
  )
}

export default LoginLayout;