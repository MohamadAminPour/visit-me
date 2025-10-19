import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import CrispChatWithStatus from "@/components/CrispChat";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "@/components/ReactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client: QueryClient = new QueryClient({});

  return (
    <html lang="fa" dir="rtl">
      <body>
        <>
          <ReactQueryProvider>
            {children}
            <CrispChatWithStatus websiteId="c1cc9cc8-ac2d-4850-a0b7-d447d8605da9" />
            <ReactQueryDevtools />
          </ReactQueryProvider>
        </>
      </body>
    </html>
  );
}
