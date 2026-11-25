import { Outlet } from "react-router-dom";
import Header from "./Header";

function Shell() {
  return (
    <div className="shell">
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default Shell;
