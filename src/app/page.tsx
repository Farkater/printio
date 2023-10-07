'use client';
import Link from 'next/link';
import { Image } from '@mantine/core';
import * as M from '@mantine/core';

import styles from './page.module.css';
import logo from '@/../public/logo.svg';
import hero from '@/../public/hero.webp';

export default function Home() {
  return (
    <div className={styles.container}>
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image className={styles.logoSVG} src={logo.src} alt='' />
        <h1 className={styles.textLogo}>
          {`Making
Printing
Great Again
`}
        </h1>
        <Link className={styles.mainLink} href='/browse'>
          Print with us
        </Link>
      </div>
      <div
        className={styles.imageSection}
        style={{
          background: `url('${hero.src}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>
    </div>
  );
}
