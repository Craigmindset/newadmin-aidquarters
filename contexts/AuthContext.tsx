"use client";
import * as React from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type Ctx = {
  user: User | null;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<Ctx>({
  user: null,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setUser(data.session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = React.useCallback(() => {
    return supabase.auth
      .signOut()
      .then(() => {
        setUser(null);
        try {
          if (typeof document !== "undefined") {
            document.cookie = "aq_logged_in=; Path=/; Max-Age=0; SameSite=Lax";
          }
        } catch {}
        if (typeof window !== "undefined") {
          window.location.assign("/");
        }
      })
      .catch(() => {
        try {
          if (typeof document !== "undefined") {
            document.cookie = "aq_logged_in=; Path=/; Max-Age=0; SameSite=Lax";
          }
        } catch {}
        if (typeof window !== "undefined") {
          window.location.assign("/");
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return React.useContext(AuthContext);
}
