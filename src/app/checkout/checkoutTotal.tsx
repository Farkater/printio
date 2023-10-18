import { Card, Button, Text, Stack } from '@mantine/core';
import React from 'react';
import { useAtom } from 'jotai';

import { checkoutAtom } from './state';
import { categories } from '../metaData';

export const CheckoutTotal = () => {
  const [checkoutState] = useAtom(checkoutAtom);

  const prices = checkoutState.map(item => {
    return item.itemQuantity * categories[item.category].price;
  });

  let totalPrice = 0;
  for (const itemPrice of prices) {
    totalPrice += itemPrice;
  }
  const beforeTax = totalPrice * 0.77;

  const vat = totalPrice - beforeTax;

  return (
    <Card shadow='sm' mt='lg' radius='md' withBorder>
      <Stack>
        <Text>Price before Tax: {beforeTax.toFixed(2)}</Text>
        <Text>VAT: {vat.toFixed(2)}</Text>
        <Text>Total Price: {totalPrice.toFixed(2)}</Text>
        <Button fullWidth color='green' mt='lg'>
          Place Order
        </Button>
      </Stack>
    </Card>
  );
};
