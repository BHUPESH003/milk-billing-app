import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import CustomNavbar from "./Navbar";

const Layout = () => {
  return (
    <main>
      <CustomNavbar />
      <Suspense fallback={"Loading....."}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default Layout;
