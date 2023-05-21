"use client";
import { useState } from "react";
import * as M from "@mantine/core";
import Link from "next/link";

import { categories } from "@/app/metaData";
import { Dropzone } from "./dropzone";

interface Props {
  params: { category: keyof typeof categories };
}

export default function Constructor({ params }: Props) {
  const { title, steps } = categories[params.category];

  const [value, onChange] = useState("rgba(47, 119, 150, 0.7)");
  const [active, setActive] = useState(0);
  const onNextStep = () => setActive(current => (current < steps.length ? current + 1 : current));
  const onPrevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  return (
    <M.Container>
      <M.Title align='center' mb='lg'>
        Constructor of {title}
      </M.Title>
      <M.Stepper active={active} onStepClick={setActive} breakpoint='sm'>
        {steps.map(step => {
          const { title, description, options: stepOptions } = step;

          return (
            <M.Stepper.Step key={title} label={title} description={description}>
              {Object.entries(stepOptions).map(([selectorName, options], optionIndex) => {
                let content;
                if (typeof options.data !== "string") {
                  const selectorOptions = options.data.map(option => ({
                    value: option,
                    label: option,
                  }));

                  if (selectorOptions.length <= 4) {
                    content = (
                      <M.Radio.Group
                        name={selectorName}
                        label={options.title}
                        description={options.placeholder}
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
                        label={options.title}
                        placeholder={options.placeholder}
                        data={selectorOptions}
                      />
                    );
                  }
                }

                if (options.data === "boolean") {
                  content = <M.Switch label={options.title} description={options.placeholder} />;
                }

                if (options.data === "space") {
                  content = <M.Space {...options.props} />;
                }

                if (options.data === "color") {
                  content = (
                    <M.Stack align='center'>
                      <M.ColorPicker format='rgba' value={value} onChange={onChange} />
                      <M.Text>{value}</M.Text>
                    </M.Stack>
                  );
                }

                if (options.data === "file") {
                  content = <Dropzone />;
                }

                if (options.data === "sizeInputGroup") {
                  content = (
                    <M.Group grow>
                      <M.Text>{options.title}</M.Text>
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
                    mb={optionIndex === Object.entries(stepOptions).length - 1 ? "xl" : ""}
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
        <M.Button onClick={onPrevStep} disabled={active === 0}>
          Previous step
        </M.Button>
        {active === steps.length - 1 ? (
          <Link href='/checkout'>
            <M.Button fullWidth color='green'>
              Checkout
            </M.Button>
          </Link>
        ) : (
          <M.Button onClick={onNextStep}>Next step</M.Button>
        )}
      </M.Group>
    </M.Container>
  );
}
