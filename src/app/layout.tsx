import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyBuddy",
  description: "Your all-in-one study companion, supercharged with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <MantineProvider>
            {children}
          </MantineProvider >
        </AuthProvider>
      </body>
    </html>
  );
}
