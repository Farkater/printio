'use client';

import Card from './card';
import * as M from '@mantine/core';

import { categories } from '../metaData';

export default function Browse() {
  return (
    <main>
      <M.Title align='center'>Browse</M.Title>
      <M.Container size='xl'>
        <M.SimpleGrid
          cols={3}
          mt='xl'
          breakpoints={[
            { maxWidth: '70rem', cols: 2, spacing: 'sm' },
            { maxWidth: '50rem', cols: 1, spacing: 'sm' },
          ]}
        >
          {Object.values(categories).map(category => (
            <Card key={category.categoryName} src={category.previewImage} {...category} />
          ))}
        </M.SimpleGrid>
      </M.Container>
    </main>
  );
}
