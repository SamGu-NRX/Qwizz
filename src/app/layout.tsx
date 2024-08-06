import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { AuthProvider } from "@/context/AuthProvider";
import '@mantine/core/styles.css';
import { auth } from '@/../lib/auth'
import '@mantine/dropzone/styles.css';
import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { ChakraProvider } from "@chakra-ui/react";
import {NextUIProvider} from "@nextui-org/system";

import Providers from "./providers"
import { getSession } from "next-auth/react";
import logoPic from '../assets/StudyBuddyLogo.png'

const theme = createTheme({
  /** Put your mantine theme override here */
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyBuddy",
  description: "Your all-in-one study companion, supercharged with AI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <Providers session={session}>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <ColorSchemeScript/>
        </head>
        <body className={inter.className}>
          <NextUIProvider>
          <ChakraProvider theme={theme}>
          <MantineProvider>
            {children}
          </MantineProvider>
          </ChakraProvider>
          </NextUIProvider>
        </body>
      </html>
    </Providers>
  );
}

