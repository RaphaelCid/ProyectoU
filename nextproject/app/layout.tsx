import "../static/css/globals.css";
import { cookies } from "next/headers";
import Navbar from "./presentation/components/navbar";
import { AuthProvider } from "./context/AuthContext";
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: "Proyecto Prototipo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/img/icon.png" />
      </head>
      <body className="bg-gradient-to-b from-slate-50 to-slate-300">
        <AuthProvider>
          <Navbar />
          <main className="p-6 w-full min-h-screen">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
