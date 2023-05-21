"use client";

import Card from "./card";
import * as M from "@mantine/core";

import { categories } from "../metaData";

export default function Browse() {
  return (
    <main>
      <M.Title align='center'>Browse</M.Title>
      <M.Container size='xl'>
        <M.SimpleGrid cols={3}>
          {Object.values(categories).map(category => (
            <Card key={category.title} {...category} />
          ))}
        </M.SimpleGrid>
      </M.Container>
    </main>
  );
}
