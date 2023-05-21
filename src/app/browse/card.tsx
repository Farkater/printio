"use client";
import Link from "next/link";
import * as M from "@mantine/core";

interface Props {
  title: string;
  path: string;
  src?: string;
}

export default function Card({ title = "Default title", src, path = "/" }: Props) {
  return (
    <Link href={path}>
      <M.Card shadow='sm' padding='lg' radius='md' withBorder>
        <M.Card.Section>
          <M.Image src={src} withPlaceholder height={160} alt={title} />
        </M.Card.Section>

        <M.Group position='apart' mt='md' mb='xs'>
          <M.Text weight={500}>{title}</M.Text>
        </M.Group>
      </M.Card>
    </Link>
  );
}
