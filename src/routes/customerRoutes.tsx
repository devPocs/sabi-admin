import React from "react";
import { Route } from "react-router-dom";
import { pageLinks } from "@services/pageLinks";
import Home from "@pages/customer/home";
import CustomerLayout from "@pages/customer/customerLayout";
import Settings from "@pages/customer/setings";
import Profile from "@pages/customer/profile";

const Products = React.lazy(() => import("../pages/customer/products"));
const Vendors = React.lazy(() => import("../pages/customer/vendors"));
const Complaints = React.lazy(() => import("../pages/customer/complaints"));

export function CustomerRoute() {
  return (
    <>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
        <Route path={pageLinks.products} element={<Products />} />
        <Route path={pageLinks.Settings} element={<Settings />} />
        <Route path={pageLinks.vendors} element={<Vendors />} />
        <Route path={pageLinks.complaints} element={<Complaints />} />
        <Route path={pageLinks.profile} element={<Profile />} />
      </Route>
    </>
  );
}
