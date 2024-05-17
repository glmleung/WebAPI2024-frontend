import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useGetAuthMe } from "../api/auth/auth";
import { User } from "../api/model";

export type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  user?: User | undefined;
  isLoading?: boolean;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({children}:{children: ReactNode}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const {data:meData, isLoading} = useGetAuthMe({query:{
    enabled: !!token
  }})

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <AuthContext.Provider value={{ token, logout ,setToken, user: meData?.data,isLoading}}>{!isLoading && children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
 return  useContext(AuthContext);
}