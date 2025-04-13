import { Route } from "react-router-dom";

import Login from "@pages/login";
import Signup from "@pages/login/signup";
import ForgetPassEmail from "@pages/login/forgetPassEmail";
import ForgetPassCode from "@pages/login/forgetPassCode";
import ChangePassword from "@pages/login/changePassword";
// const Login = React.lazy(() => import("../pages/login"));

export function NonAuthRoute() {
  return (
    <>
      <Route path={"/"} element={<Login />} />
      <Route path={"/Signup"} element={<Signup />} />
      <Route path={"/ForgetPassEmail"} element={<ForgetPassEmail />} />
      <Route path={"/ForgetPassCode"} element={<ForgetPassCode />} />
      <Route path={"/ChangePassword"} element={<ChangePassword />} />
    </>
  );
}
