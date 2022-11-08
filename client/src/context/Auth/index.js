import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useUsers } from "../../api/users";

export const AuthContext = createContext({});
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error(`Can't use this hook outside Auth conext`);

  return context;
};

const AuthProvider = ({ children }) => {
  const users = useUsers();
  const [user, setUser] = useState(null);
  const login = useCallback(
    (username, password) => {
      const user = users?.filter(
        (user) => user.username === username && user.username === password
      );
      if (!user.length) {
        return { error: "Can't find user." }
      };

      setUser(user[0])

    },
    [users]
  );

  const value = useMemo(() => {
    return {
      login,
      user,
    };
  }, [user, login]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
