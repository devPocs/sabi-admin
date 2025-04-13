import React from "react";
import { Route } from "react-router-dom";
import { pageLinks } from "@services/pageLinks";
import Home from "@pages/vendor/home";
import VendorLayout from "@pages/vendor/vendorLayout";
import Settings from "@pages/vendor/settings";
import Profile from "@pages/vendor/profile";

const Products = React.lazy(() => import("../pages/vendor/products"));

export function VendorRoute() {
  return (
    <>
      <Route path="/" element={<VendorLayout />}>
        <Route index element={<Home />} />
      </Route>
    </>
  );
}
