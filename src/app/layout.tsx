"use client";

import * as M from "@mantine/core";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Print.io",
  description: "Print on anything",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <M.MantineProvider theme={{ colorScheme: "dark" }} withGlobalStyles withNormalizeCSS>
          <M.AppShell
            padding='md'
            styles={theme => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
              },
            })}
            header={
              <M.Header height={60} p='xs'>
                <M.Title align='center'>Print.io</M.Title>
              </M.Header>
            }
          >
            {children}
          </M.AppShell>
        </M.MantineProvider>
      </body>
    </html>
  );
}
