'use client';

import React, { useEffect, useRef, memo } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { Group, Button, Box } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

import tshirtImage from '@/../public/shirt.webp';

interface Props {
  setImg(value?: string): void;
}

const Preview = ({ setImg }: Props) => {
  const { editor, onReady } = useFabricJSEditor();
  const openRef = useRef<() => void>(null);

  const onAddImage = (files: FileWithPath[]) => {
    if (!files[0]) return;
    if (!editor?.canvas) return;
    const { canvas } = editor;

    const imageUrl = URL.createObjectURL(files[0]);

    fabric.Image.fromURL(imageUrl, img => {
      if (!canvas.height || !canvas.width) return;

      const image = img.set({
        originX: 'left',
        originY: 'top',
        width: img.width,
        height: img.height,
      });

      img.scaleToWidth(canvas.width / 2);

      canvas.add(image);
    });
  };

  useEffect(() => {
    editor?.canvas.setHeight(tshirtImage.height);

    fabric.Image.fromURL(tshirtImage.src, img => {
      if (!editor?.canvas) return;
      const { canvas } = editor;
      if (!canvas.height || !canvas.width) return;

      img.scaleToHeight(canvas.height);
      img.scaleToWidth(canvas.width);

      img.set({
        originX: 'left',
        originY: 'top',
      });

      canvas.clipPath = img;

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    editor?.canvas.on('mouse:up', () => {
      const href = editor?.canvas.toDataURL({
        format: 'jpeg',
        quality: 0.8,
      });

      setImg(href);
    });
  }, [editor, setImg]);

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} openRef={openRef} onDrop={onAddImage} activateOnClick={false}>
        <Group position='center'>
          <Button onClick={() => openRef.current?.()} style={{ pointerEvents: 'all' }}>
            Select files
          </Button>
        </Group>
      </Dropzone>
      <Box mt='lg'>
        <FabricJSCanvas onReady={onReady} />
      </Box>
    </div>
  );
};

export const TshirtPreview = memo(Preview);
