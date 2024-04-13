"use client";

import { ComposeChildren } from "@/shared/lib/react";
import { queryClient } from "@/shared/lib/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClientProvider } from "@tanstack/react-query";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <QueryClientProvider client={queryClient} />
      <GoogleOAuthProvider clientId="550984531022-d35qq7ndbiv8kvfnbrqj9b2tv4pv0lhe.apps.googleusercontent.com">
        {children}
      </GoogleOAuthProvider>
    </ComposeChildren>
  );
}
