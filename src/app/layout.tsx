import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { PostProvider } from "@/contexts/PostContext";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Levercast",
  description: "Social media content management made easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PostProvider>
            <ProfileProvider>
              <div className="min-h-screen bg-background">
                <div className="flex h-screen">
                  <Sidebar />
                  <main className="flex-1 overflow-auto p-8">
                    <div className="text-foreground">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            </ProfileProvider>
          </PostProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
