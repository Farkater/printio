import React from 'react';
import { CategoryName } from '@/app/metaData';
import { TshirtPreview } from './tshirt';
import { CalendarPreview } from './calendar';

interface Props {
  type: `${CategoryName}`;
  setImg(value?: string): void;
}

export const PreviewBuilder = ({ type, setImg }: Props) => {
  if (type === 'tshirts') {
    return <TshirtPreview setImg={setImg} />;
  }
  if (type === 'calendars') {
    return <CalendarPreview setImg={setImg} />;
  }

  return <div>PreviewBuilder</div>;
};
