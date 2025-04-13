import { useNavigate } from "react-router-dom";
import { logIn, logOut } from "../redux/reducers/usersSlice";

import { useDispatch } from "react-redux";

export const useAuthService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logOut());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleLogIn = (data: object) => {
    dispatch(logIn(data));
  };

  return { handleLogIn, handleLogout };
};
