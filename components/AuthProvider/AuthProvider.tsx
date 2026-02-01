"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, logout, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const PRIVATE_ROUTES = ["/profile"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const session = await checkSession();

        if (!session.authenticated) {
          if (PRIVATE_ROUTES.some((r) => pathname.startsWith(r))) {
            await logout();
            clearIsAuthenticated();
            router.replace("/sign-in");
            return;
          }
        } else {
          const user = await getMe();
          setUser(user);
        }
      } catch {
        clearIsAuthenticated();
        router.replace("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [pathname]);

  if (loading) {
    return;
    <p style={{ textAlign: "center" }}> Loading...</p>;
  }

  return <>{children}</>;
}
