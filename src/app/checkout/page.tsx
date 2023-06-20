'use client';
import { useAtom } from 'jotai';
import { Timeline, Text } from '@mantine/core';

import { checkoutAtom } from './state';
import { categories, Option } from '../metaData';

export default function Home() {
  const [checkoutState] = useAtom(checkoutAtom);

  if (!checkoutState.checkout) return null;
  if (!checkoutState.category) return null;

  const steps = categories[checkoutState.category].steps;

  return (
    <main>
      <Timeline active={Object.entries(checkoutState.checkout).length}>
        {Object.entries(checkoutState.checkout).map(([key, value]) => {
          let option: Option | undefined;

          steps.forEach(step => {
            const found = Object.entries(step.options).find(([optionKey]) => optionKey === key)?.[1];
            if (found) option = found;
          });

          if (!option) return ':(';

          const label = option?.label;
          const data = option?.data;

          return (
            <Timeline.Item>
              <Text>{label}</Text>
              {data === 'boolean' ? 'yes' : <Text>{value}</Text>}
            </Timeline.Item>
          );
        })}
      </Timeline>
    </main>
  );
}
