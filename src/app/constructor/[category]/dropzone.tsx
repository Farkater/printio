'use client';

import { Group, Text, useMantineTheme, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import * as MD from '@mantine/dropzone';

export function Dropzone(props: Partial<MD.DropzoneProps>) {
  const theme = useMantineTheme();
  return (
    <MD.Dropzone
      onDrop={files => console.log('accepted files', files)}
      onReject={files => console.log('rejected files', files)}
      maxSize={3 * 1024 ** 2}
      accept={MD.IMAGE_MIME_TYPE}
      {...props}
    >
      <Group position='center' spacing='xl' style={{ minHeight: rem(220), pointerEvents: 'none' }}>
        <MD.Dropzone.Accept>
          <IconUpload
            size='3.2rem'
            stroke={1.5}
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </MD.Dropzone.Accept>
        <MD.Dropzone.Reject>
          <IconX size='3.2rem' stroke={1.5} color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]} />
        </MD.Dropzone.Reject>
        <MD.Dropzone.Idle>
          <IconPhoto size='3.2rem' stroke={1.5} />
        </MD.Dropzone.Idle>

        <div>
          <Text size='xl' inline>
            Drag your image here or click to select one
          </Text>
        </div>
      </Group>
    </MD.Dropzone>
  );
}
