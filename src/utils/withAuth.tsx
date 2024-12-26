"use client";

import Loader from "@/components/Loader";
import { setUser } from "@/redux/features/userSlice";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

async function getSession() {
  const response = await fetch('/api/session', { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch session data");
  return response.json();
}

export function withAuth(Component: React.ComponentType) {
  return function ProtectedComponent(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      async function checkAuth() {
        try {
          const session = await getSession();
          if (session.user_id) {
            setIsAuthenticated(true);
            dispatch(setUser({ id: session.user_id, email: session.email }));
          } else {
            router.push("/login"); 
          }
        } catch {
          router.push("/login");
        }
      }

      checkAuth();
    }, [router]);

    if (isAuthenticated === null) {
      return <div><Loader/></div>;
    }

    return isAuthenticated ? <Component {...props} /> : (
        <div className="flex items-center justify-center gap-4 h-screen">
          <div className="bg-slate-200 p-8 rounded-lg shadow-md flex-col">
            <h3 className="mb-3">Kindly login to access the page</h3>
            <Link href="/login">
              <Button variant="outlined" fullWidth>Login</Button>
            </Link>
          </div>
        </div>
    )
  };
}
