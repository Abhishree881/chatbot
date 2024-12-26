"use client";

import { StytchProvider } from "@stytch/nextjs";
import { createStytchUIClient } from "@stytch/nextjs/ui";
import ReduxProvider from "@/redux/provider";

const stytchClient = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN as string
);

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StytchProvider stytch={stytchClient}>
      <ReduxProvider>{children}</ReduxProvider>
    </StytchProvider>
  );
}
