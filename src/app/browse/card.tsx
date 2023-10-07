'use client';
import Link from 'next/link';
import * as M from '@mantine/core';
import styles from './page.module.css';

interface Props {
  categoryName: string;
  path: string;
  src?: string;
}
export default function Card({ categoryName = 'Default title', src, path = '/' }: Props) {
  return (
    <Link href={path} prefetch className={styles.link}>
      <M.Card shadow='sm' padding='lg' radius='md' withBorder>
        <M.Card.Section>
          <M.Image src={src} withPlaceholder height={400} alt={categoryName} />
        </M.Card.Section>

        <M.Group position='apart' mt='md' mb='xs'>
          <M.Text weight={500}>{categoryName}</M.Text>
        </M.Group>
      </M.Card>
    </Link>
  );
}
