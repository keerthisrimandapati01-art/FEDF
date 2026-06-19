import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = { name: string; email: string; tier: "Silver" | "Gold" | "Platinum" };

type AuthState = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email) =>
        set({
          user: {
            name: email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()),
            email,
            tier: "Platinum",
          },
        }),
      logout: () => set({ user: null }),
    }),
    { name: "skyline-auth" },
  ),
);