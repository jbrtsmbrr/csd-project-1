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
import { loginUser } from "../../api/users";

export const AuthContext = createContext({});
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error(`Can't use this hook outside Auth conext`);

  return context;
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = JSON.parse(Cookie.get("user") || "{}");

    return Object.keys(user).length ? user : null;
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

  const login = useCallback(async (username, password) => {
    const response = await loginUser({ username, password });
    const { data, error } = await response;

    if (error) return error;

    const { user, token } = data;

    if (user?.role?.description !== "admin" && user?.status !== "approved") return 1;

    setUser(user);
    Cookie.set("user", JSON.stringify(user));
    Cookie.set("token", token);
    navigate(from, { replace: true });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    Cookie.remove("user");
    Cookie.remove("token");
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
