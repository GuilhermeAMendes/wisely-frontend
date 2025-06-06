// External library
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

// Service
import API from "@services/api";

// Types
interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  token: string;
  exp: number;
  iat: number;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { push } = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      const isExpired = checkTokenExpiration(userData.exp);
      if (!isExpired) {
        setUser(userData);
      } else {
        logout();
      }
    } else {
      logout();
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await API.post("/login", credentials);
      const token = response.data.token;
      const decodedToken = jwtDecode<{
        sub: string;
        exp: number;
        iat: number;
      }>(token);

      if (decodedToken.exp * 1000 < Date.now()) {
        throw new Error("Token expirado");
      }

      const userData = {
        id: decodedToken.sub,
        email: credentials.email,
        exp: decodedToken.exp,
        iat: decodedToken.iat,
        token,
      };

      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.response?.data &&
        typeof axiosError.response.data === "object"
      ) {
        const message = (axiosError.response.data as { message: string })
          .message;
        throw new Error(message || "Falha ao realizar login");
      }
      throw new Error("Falha ao realizar login");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    push("/login");
  };

  const checkTokenExpiration = (exp: number) => {
    return exp * 1000 < Date.now();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within an AuthProvider");
  }
  return context;
};
