'use client';
import Link from 'next/link';
import { Title } from '@mantine/core';
import * as M from '@mantine/core';

import { categories } from '@/app/metaData';

interface Props {
  params: { category: keyof typeof categories };
}

export default function Category({ params }: Props) {
  const { categoryName, previewImage } = categories[params.category];

  return (
    <M.Grid>
      <M.Col>
        <Title>{categoryName}</Title>
        <M.Image src={previewImage} withPlaceholder />
      </M.Col>
      <M.Col>
        <M.Text>Desc</M.Text>
        <Link href={`/constructor/${params.category}`}>Order</Link>
      </M.Col>
    </M.Grid>
  );
}
