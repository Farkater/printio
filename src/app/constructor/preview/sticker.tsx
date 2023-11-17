'use client';

import React, { useEffect, useRef, memo } from 'react';
import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { Group, Button, Box } from '@mantine/core';
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';

interface Props {
  setImg(value?: string): void;
  dimensions: { width: number; height: number };
}

const Preview = ({ setImg, dimensions }: Props) => {
  const { editor, onReady } = useFabricJSEditor();
  const containerRef = useRef<HTMLDivElement>(null);
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
    const container_width = containerRef.current?.offsetWidth || 100;
    const container_height = containerRef.current?.offsetHeight || 100;

    let canvas_height;
    let canvas_width;

    if (dimensions.width > dimensions.height) {
      canvas_width = container_width;
      canvas_height = container_width / (dimensions.width / dimensions.height);
    } else {
      canvas_height = container_height;
      canvas_width = container_height * (dimensions.width / dimensions.height);
    }

    editor?.canvas.setDimensions({
      height: canvas_height,
      width: canvas_width,
    });

    editor?.canvas.on('mouse:up', () => {
      const href = editor?.canvas.toDataURL({
        format: 'jpeg',
        quality: 0.8,
      });

      setImg(href);
    });
  }, [dimensions.height, dimensions.width, editor, setImg]);

  return (
    <div style={{ height: '100%' }}>
      <Dropzone accept={IMAGE_MIME_TYPE} openRef={openRef} onDrop={onAddImage} activateOnClick={false}>
        <Group position='center'>
          <Button onClick={() => openRef.current?.()} style={{ pointerEvents: 'all' }}>
            Select files
          </Button>
        </Group>
      </Dropzone>
      <Box mt='lg' ref={containerRef} style={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
        <FabricJSCanvas onReady={onReady} />
      </Box>
    </div>
  );
};

export const StickerPreview = memo(Preview);
