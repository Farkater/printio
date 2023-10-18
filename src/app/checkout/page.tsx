'use client';
import { useAtom } from 'jotai';
import {
  Title,
  Box,
  Image,
  NumberInput,
  Group,
  ActionIcon,
  NumberInputHandlers,
  Card,
  rem,
  Chip,
  Grid,
  Text,
  Flex,
} from '@mantine/core';
import { useRef } from 'react';
import { IconTrashX } from '@tabler/icons-react';
import Link from 'next/link';

import styles from './page.module.css';
import { checkoutAtom, CheckoutAtom } from './state';
import { categories, Option } from '../metaData';
import { CheckoutTotal } from './checkoutTotal';

type CheckoutCardProps = {
  checkoutItem: CheckoutAtom[number];
};

function CheckoutCard({ checkoutItem }: CheckoutCardProps) {
  const [checkoutState, setCheckoutState] = useAtom(checkoutAtom);

  const itemQuantityHandlers = useRef<NumberInputHandlers>();

  if (!checkoutItem.checkout) return null;
  if (!checkoutItem.category) return null;

  const handleRemoveFromCheckout = (id: string) => () => {
    setCheckoutState(checkoutState.filter(item => item.id !== id));
  };

  function itemPrice(pricePerPiece: number) {
    const price = checkoutItem.itemQuantity * pricePerPiece;

    return price;
  }

  const setItemQuantity = (quantity: number, id: string) => {
    const item = checkoutState.find(item => item.id === id);
    const oldCheckout = checkoutState.filter(item => item.id !== id);

    setCheckoutState([...oldCheckout, { ...item, itemQuantity: quantity }]);
  };

  const steps = categories[checkoutItem.category].steps;

  return (
    <Card shadow='sm' radius='md' withBorder className={styles.itemCard}>
      <Image
        src={checkoutItem.image || categories[checkoutItem.category].previewImage}
        width={200}
        height={200}
        alt='123'
        withPlaceholder
      />
      <Box ml='lg' style={{ width: '100%' }}>
        <Group mb='lg' position='apart'>
          <Title>{categories[checkoutItem.category].categoryName}</Title>
          <ActionIcon size={42} onClick={handleRemoveFromCheckout(checkoutItem.id)}>
            <IconTrashX style={{ width: rem(24), height: rem(24) }} />
          </ActionIcon>
        </Group>
        <Group spacing={5}>
          <span>Amount</span>
          <ActionIcon
            size={42}
            variant='default'
            disabled={checkoutItem.itemQuantity === 1}
            onClick={() => itemQuantityHandlers?.current?.decrement()}
          >
            –
          </ActionIcon>

          <NumberInput
            hideControls
            value={checkoutItem.itemQuantity}
            onChange={val => setItemQuantity(Number(val), checkoutItem.id)}
            handlersRef={itemQuantityHandlers}
            max={9999}
            min={1}
            step={1}
            styles={{ input: { width: rem(54), height: rem(42), textAlign: 'center' } }}
          />

          <ActionIcon
            size={42}
            variant='default'
            disabled={checkoutItem.itemQuantity === 9999}
            onClick={() => itemQuantityHandlers?.current?.increment()}
          >
            +
          </ActionIcon>
        </Group>

        <Flex justify={'space-between'} mt='xl'>
          <Group>
            {Object.entries(checkoutItem.checkout).map(([key, value]) => {
              let option: Option | undefined;

              steps.forEach(step => {
                const found = Object.entries(step.options).find(([optionKey]) => optionKey === key)?.[1];
                if (found) option = found;
              });

              if (!option) return ':(';

              const label = option?.label;
              const data = option?.data;

              if (label.includes('Background') || label.includes('color')) return null;

              let content: React.ReactNode = value;

              if (data === 'boolean') content = value ? 'yes' : 'no';
              if (data === 'color') content = '';

              return (
                <Chip checked={false} key={label}>
                  {label}: {content}
                </Chip>
              );
            })}
          </Group>

          <Group>
            <Text style={{ whiteSpace: 'nowrap' }}>Price: {itemPrice(categories[checkoutItem.category].price)}</Text>
          </Group>
        </Flex>
      </Box>
    </Card>
  );
}

export default function Home() {
  const [checkoutState] = useAtom(checkoutAtom);

  if (!checkoutState.length)
    return (
      <Box>
        <Title>Your cart is empty</Title>
        <Link href='/browse'>Browse our catalogue to find something you like</Link>
      </Box>
    );

  return (
    <Grid>
      <Grid.Col span={9}>
        {checkoutState
          .sort((a, b) => a.id.localeCompare(b.id))
          .map((checkoutItem, i) => {
            return <CheckoutCard key={i} checkoutItem={checkoutItem} />;
          })}
      </Grid.Col>
      <Grid.Col span={3}>
        <CheckoutTotal />
      </Grid.Col>
    </Grid>
  );
}
