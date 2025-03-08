import { useAtom } from "jotai";
import { Navigate } from "react-router-dom";
import { userAuth } from "../store/store";
import { JSX } from "react";

function PrivateRoute(props: { children: JSX.Element }) {
  const isAuthenticated = useAtom(userAuth)[0];
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return props.children;
}

export default PrivateRoute;
