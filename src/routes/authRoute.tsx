import React from "react";
import { Route } from "react-router-dom";

//import { pageLinks } from "@services/pageLinks";

const AuthLayout = React.lazy(() => import("../components/authLayout"));

export function ChairmanRoute() {
  return (
    <>
      <Route path="/" element={<AuthLayout />}></Route>
    </>
  );
}
