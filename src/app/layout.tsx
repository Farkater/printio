'use client';

import * as M from '@mantine/core';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Image } from '@mantine/core';
import { usePathname } from 'next/navigation';
import logo from '@/../public/logo.svg';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Print.io',
  description: 'Print on anything',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <html lang='en'>
      <body className={inter.className}>
        <M.MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
          {path !== '/' ? (
            <M.AppShell
              padding='md'
              styles={theme => ({
                main: {
                  backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
              })}
              header={
                <M.Header height={60} p='xs'>
                  <M.Flex justify='start'>
                    <Link href={'/'}>
                      <Image width={65} src={logo.src} alt='' />
                      {/* <M.Title align='center'>Print.io</M.Title> */}
                    </Link>
                  </M.Flex>
                </M.Header>
              }
            >
              {children}
            </M.AppShell>
          ) : (
            children
          )}
        </M.MantineProvider>
      </body>
    </html>
  );
}
