"use client";

import { EdgeStoreProvider } from "@/lib/edgeStore";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {

  return (
    <SessionProvider>
      <EdgeStoreProvider>
      {children}
      </EdgeStoreProvider>
    </SessionProvider>
  );
};

export default ClientWrapper;
