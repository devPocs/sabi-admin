import React from "react";
import { Route } from "react-router-dom";
import { pageLinks } from "@services/pageLinks";
import Home from "@pages/admin/home";
import AdminLayout from "@pages/admin/adminLayout";
import AuditLog from "@pages/admin/auditLog";
import Subscription from "@pages/admin/subscription";
const Customers = React.lazy(() => import("@pages/admin/customers"));
const TeamMembers = React.lazy(() => import("@pages/admin/teamMembers"));
const Complaints = React.lazy(() => import("@pages/admin/complaints"));
const UrgentPurchaseRequests = React.lazy(
  () => import("@pages/admin/urgentPurchaseRequests")
);
const Vendors = React.lazy(() => import("@pages/admin/vendors"));
const SubscriptionDetails = React.lazy(
  () => import("@pages/admin/subscription/subscriptionDetails")
);

export function AdminRoute() {
  return (
    <>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Home />} />
        <Route path={pageLinks.customers} element={<Customers />} />
        <Route path={pageLinks.teamMembers} element={<TeamMembers />} />
        <Route path={pageLinks.complaints} element={<Complaints />} />
        <Route path={pageLinks.auditLog} element={<AuditLog />} />

        {/* Subscription routes with nested detail route */}
        <Route path={pageLinks.subscription}>
          <Route index element={<Subscription />} />
          <Route path=":id" element={<SubscriptionDetails />} />
        </Route>

        <Route
          path={pageLinks.urgentPurchaseRequests}
          element={<UrgentPurchaseRequests />}
        />
        <Route path={pageLinks.vendors} element={<Vendors />} />
      </Route>
    </>
  );
}
