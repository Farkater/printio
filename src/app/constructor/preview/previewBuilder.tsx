import React from 'react';
import { TshirtPreview } from './tshirt';
import { CalendarPreview } from './calendar';
import { StickerPreview } from './sticker';
import { BagPreview } from './bag';

type Props =
  | {
      type: 'tshirts';
      setImg(value?: string): void;
    }
  | {
      type: 'calendars';
      setImg(value?: string): void;
    }
  | {
      type: 'bags';
      dimensions: { width: number; height: number };
      setImg(value?: string): void;
    }
  | {
      type: 'stickers';
      dimensions: { width: number; height: number };
      setImg(value?: string): void;
    }
  | {
      type: 'posters';
      dimensions: { width: number; height: number };
      setImg(value?: string): void;
    };

export const PreviewBuilder = (props: Props) => {
  if (props.type === 'tshirts') {
    return <TshirtPreview setImg={props.setImg} />;
  }
  if (props.type === 'bags') {
    return <BagPreview setImg={props.setImg} />;
  }
  if (props.type === 'calendars') {
    return <CalendarPreview setImg={props.setImg} />;
  }
  if (props.type === 'stickers') {
    return <StickerPreview setImg={props.setImg} dimensions={props.dimensions} />;
  }
  if (props.type === 'posters') {
    return <StickerPreview setImg={props.setImg} dimensions={props.dimensions} />;
  }

  return <div>PreviewBuilder</div>;
};
