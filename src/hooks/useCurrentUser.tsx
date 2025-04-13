import { useSelector } from "react-redux";
import { user } from "../interface/user";

export const useCurrentUser = () => {
  const currentUser = useSelector(({ user }: { user: user }) => user);

  const { data, isLoggedIn, role } = currentUser;

  // const dispatch = useDispatch();

  return {
    data,
    isLoggedIn,
    role
  };
};
