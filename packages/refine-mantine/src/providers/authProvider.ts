import type { AuthProvider as RefineAuthProvider } from "@refinedev/core";
import { wait } from "@/utils/wait";

export interface AuthProvider extends RefineAuthProvider {
  login: (options: LoginOptions) => ReturnType<RefineAuthProvider["login"]>;
  requestOtp?: (options: { email: string, password?: string }) => Promise<void>;
}

export type LoginOptions = {
  type: "password"
  email: string;
  password: string;
} | {
  type: "otp";
  email: string;
  token: string;
} | {
  type: "mfa";
  email: string;
  password: string;
  token: string;
} | {
  type: "oauth";
  providerName: string;
};

const LOCAL_STORAGE_KEY = "auth";

export const authProvider: AuthProvider = {
  requestOtp: async () => {
    await wait(1000);
  },

  login: async (options: LoginOptions) => {
    await wait(1000);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(options));

    return {
      success: true,
      redirectTo: "/",
    };
  },

  logout: async () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return {
        logout: true,
      };
    }

    return { error };
  },

  check: async () =>
    localStorage.getItem(LOCAL_STORAGE_KEY)
      ? {
          authenticated: true,
        }
      : {
          authenticated: false,
          redirectTo: "/login",
        },
  
  register: async () => {
    await wait(1000);

    return {
      success: true,
    };
  },

  getIdentity: async () => ({
    id: "7d27d7c8-adca-49e6-88ea-c6f2c15caa6c",
    name: "John Doe",
    email: "jd@example.com",
    avatar: "https://ui-avatars.com/api/?name=John+Doe",
  }),

  getPermissions: async () => null,
};
