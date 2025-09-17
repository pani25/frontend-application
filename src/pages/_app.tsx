import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <Component {...pageProps} />;
      </AuthProvider>
    </HeroUIProvider>
  )  
}
