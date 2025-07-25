import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;

