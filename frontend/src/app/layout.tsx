import "./globals.css";
import CrispChatWithStatus from "@/components/CrispChat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
       <>
        {children}
        <CrispChatWithStatus websiteId="c1cc9cc8-ac2d-4850-a0b7-d447d8605da9"/>
       </>
      </body>
    </html>
  );
}
