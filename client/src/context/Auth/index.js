import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookie from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useUsers } from "../../api/users";

export const AuthContext = createContext({});
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error(`Can't use this hook outside Auth conext`);

  return context;
};

const AuthProvider = ({ children }) => {
  const users = useUsers();
  const [user, setUser] = useState(() => {
    const user = JSON.parse(Cookie.get("user") || "{}");
    return user;
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/projects";

  useEffect(() => {
    let timeout;
    if (Cookie.get(user)) {
      // Uncomment this to trigger auto logout
      // timeout = setTimeout(logout, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [user]);

  const login = useCallback(
    (username, password) => {
      const user = users?.filter(
        (user) => user.username === username && user.username === password
      );
      if (!user.length) {
        return { error: "Can't find user." };
      }

      setUser(user[0]);
      Cookie.set("user", JSON.stringify(user[0]));
      navigate(from, { replace: true });
    },
    [users]
  );

  const logout = useCallback(() => {
    setUser(null);
    Cookie.remove("user");
    navigate("/login");
  }, []);

  const value = useMemo(() => {
    return {
      login,
      user,
      logout,
    };
  }, [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
