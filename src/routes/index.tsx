import { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { NonAuthRoute } from "./nonAuthRoute";
import NotFoundPage from "../pages/NotFoundPage";
import { useCurrentUser } from "../hooks/useCurrentUser";
import Spinner from "@components/spinner";
import Login from "@pages/login";
import ChangePassword from "@pages/login/changePassword";
import ForgetPassCode from "@pages/login/forgetPassCode";
import ForgetPassEmail from "@pages/login/forgetPassEmail";
import { AdminRoute } from "./adminRoute";

const AppRoutes = () => {
  const { data, role, isLoggedIn } = useCurrentUser();
  console.log("role is:", role);
  console.log(data);

  return (
    <Suspense
      fallback={
        <Box mt="20%" textAlign={"center"} style={{ widows: "100vw" }}>
          <Spinner />
        </Box>
      }
    >
      <Routes>
        {isLoggedIn ? (role === "admin" ? AdminRoute() : null) : NonAuthRoute()}
        <Route path="/login" element={<Login />} />

        {/* Password reset flow */}
        <Route path="/forgot-password" element={<ForgetPassEmail />} />
        <Route path="/verify-otp" element={<ForgetPassCode />} />
        <Route path="/reset-password" element={<ChangePassword />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
