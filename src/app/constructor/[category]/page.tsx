'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as M from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAtom } from 'jotai';

import { checkoutAtom } from '@/app/checkout/state';
import { categories } from '@/app/metaData';
import { Dropzone } from './dropzone';

interface Props {
  params: { category: keyof typeof categories };
}

export default function Constructor({ params }: Props) {
  const { categoryName, steps } = categories[params.category];
  const [checkoutState, setCheckoutState] = useAtom(checkoutAtom);
  const form = useForm<(typeof checkoutState)['checkout']>();
  const router = useRouter();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const onNextStep = () => setActiveStepIndex(current => (current < steps.length ? current + 1 : current));
  const onPrevStep = () => setActiveStepIndex(current => (current > 0 ? current - 1 : current));

  const handleSubmit = (values: (typeof checkoutState)['checkout']) => {
    setCheckoutState({ category: params.category, checkout: values });
    router.push('/checkout');
  };
  const shouldCheckout = activeStepIndex === steps.length - 1;

  return (
    <M.Container>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <M.Title align='center' mb='lg'>
          Constructor of {categoryName}
        </M.Title>
        <M.Stepper active={activeStepIndex} onStepClick={setActiveStepIndex} breakpoint='sm'>
          {steps.map(step => {
            const { stepTitle, stepDescription, options: stepOptions } = step;

            return (
              <M.Stepper.Step key={stepTitle} label={stepTitle} description={stepDescription}>
                {Object.entries(stepOptions).map(([selectorName, options], optionIndex) => {
                  let content;
                  if (typeof options.data !== 'string') {
                    const selectorOptions = options.data.map(option => ({
                      value: option,
                      label: option,
                    }));

                    if (selectorOptions.length <= 4) {
                      content = (
                        <M.Radio.Group
                          name={selectorName}
                          label={options.label}
                          description={options.description}
                          {...form.getInputProps(selectorName)}
                        >
                          <M.Group mt='xs'>
                            {selectorOptions.map(option => {
                              return <M.Radio key={option.value} {...option} />;
                            })}
                          </M.Group>
                        </M.Radio.Group>
                      );
                    } else {
                      content = (
                        <M.Select
                          key={selectorName}
                          label={options.label}
                          description={options.description}
                          data={selectorOptions}
                          {...form.getInputProps(selectorName)}
                        />
                      );
                    }
                  }

                  if (options.data === 'boolean') {
                    content = (
                      <M.Switch
                        label={options.label}
                        description={options.description}
                        {...form.getInputProps(selectorName)}
                      />
                    );
                  }

                  if (options.data === 'space') {
                    content = <M.Space {...options.props} />;
                  }

                  if (options.data === 'color') {
                    content = (
                      <M.Stack align='center'>
                        <M.ColorPicker format='rgba' {...form.getInputProps(selectorName)} />
                      </M.Stack>
                    );
                  }

                  if (options.data === 'file') {
                    content = <Dropzone {...form.getInputProps(selectorName)} />;
                  }

                  if (options.data === 'sizeInputGroup') {
                    content = (
                      <M.Group grow {...form.getInputProps(selectorName)}>
                        <M.Text>{options.label}</M.Text>
                        <M.Group grow>
                          <M.NumberInput label='Width' />
                          <M.NumberInput label='Height' />
                          <M.NumberInput label='Length' />
                        </M.Group>
                      </M.Group>
                    );
                  }

                  return (
                    <M.Box
                      key={selectorName}
                      mt='md'
                      mb={optionIndex === Object.entries(stepOptions).length - 1 ? 'xl' : ''}
                    >
                      {content}
                    </M.Box>
                  );
                })}
              </M.Stepper.Step>
            );
          })}
        </M.Stepper>

        <M.Group grow mt='md'>
          <M.Button onClick={onPrevStep} disabled={activeStepIndex === 0}>
            Previous step
          </M.Button>
          {shouldCheckout ? (
            // key prevent from from submitting...
            <M.Button key='submit' type='submit' fullWidth color='green'>
              Checkout
            </M.Button>
          ) : (
            <M.Button key='next' onClick={onNextStep}>
              Next step
            </M.Button>
          )}
        </M.Group>
      </form>
    </M.Container>
  );
}
