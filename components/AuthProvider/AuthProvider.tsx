"use client";

import { useEffect, useState } from "react";
import { checkSession, logout, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const session = await checkSession();

        if (!session.authenticated) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  return <>{children}</>;
}
