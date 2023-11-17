'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as M from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAtom } from 'jotai';
import * as uuid from 'uuid';

import { checkoutAtom, CheckoutAtom } from '@/app/checkout/state';
import { categories, CategoryName } from '@/app/metaData';
import { PreviewBuilder } from '../preview/previewBuilder';
import { Dropzone } from './dropzone';
import './page.css';

interface Props {
  params: { category: CategoryName };
}

type FormValues = CheckoutAtom[number]['checkout'];

export default function Constructor({ params }: Props) {
  const { categoryName, steps } = categories[params.category];

  const [checkoutState, setCheckoutState] = useAtom(checkoutAtom);
  const form = useForm<FormValues>();
  const router = useRouter();
  const [img, setImg] = useState<string | undefined>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const shouldCheckout = activeStepIndex === steps.length - 1;

  const onNextStep = () => setActiveStepIndex(current => (current < steps.length ? current + 1 : current));
  const onPrevStep = () => setActiveStepIndex(current => (current > 0 ? current - 1 : current));

  const handleSubmit = (values: FormValues) => {
    setCheckoutState([
      ...checkoutState,
      { id: uuid.v1(), category: params.category, checkout: values, image: img, itemQuantity: 1 },
    ]);
    router.push('/checkout');
  };

  const onDimensionsChange = (selector: string) => (value: number) => {
    const fieldName = selector.includes('width') ? 'width' : selector.includes('height') ? 'height' : 'length';

    setDimensions({
      ...dimensions,
      [fieldName]: value,
    });

    form.setFieldValue(selector, value);
  };

  const onBackToCatalogue = () => {
    router.push('/browse');
  };

  return (
    <M.Container style={{ height: '100%' }}>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <M.Title align='center' mb='lg'>
          Constructor of {categoryName}
        </M.Title>
        <M.Stepper active={activeStepIndex} onStepClick={setActiveStepIndex} breakpoint='sm' style={{ flex: 1 }}>
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

                  if (options.data === 'previewBuilder') {
                    content = <PreviewBuilder type={params.category} setImg={setImg} dimensions={dimensions} />;
                  }

                  if (options.data === 'ThreeSizeInputGroup') {
                    content = (
                      <M.Group grow>
                        <M.Text>{options.label}</M.Text>
                        <M.Group grow>
                          <M.NumberInput
                            label='Width'
                            {...form.getInputProps(selectorName + '_width')}
                            onChange={onDimensionsChange(selectorName + '_width')}
                          />
                          <M.NumberInput
                            label='Height'
                            {...form.getInputProps(selectorName + '_height')}
                            onChange={onDimensionsChange(selectorName + '_height')}
                          />
                          <M.NumberInput
                            label='Length'
                            {...form.getInputProps(selectorName + '_length')}
                            onChange={onDimensionsChange(selectorName + '_length')}
                          />
                        </M.Group>
                      </M.Group>
                    );
                  }

                  if (options.data === 'TwoSizeInputGroup') {
                    content = (
                      <M.Group grow>
                        <M.Text>{options.label}</M.Text>
                        <M.Group grow>
                          <M.NumberInput
                            label='Width'
                            {...form.getInputProps(selectorName + '_width')}
                            onChange={onDimensionsChange(selectorName + '_width')}
                          />
                          <M.NumberInput
                            label='Height'
                            {...form.getInputProps(selectorName + '_height')}
                            onChange={onDimensionsChange(selectorName + '_height')}
                          />
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
          {activeStepIndex === 0 ? (
            <M.Button onClick={onBackToCatalogue}>Back to catalogue</M.Button>
          ) : (
            <M.Button onClick={onPrevStep} disabled={activeStepIndex === 0}>
              Previous step
            </M.Button>
          )}
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
