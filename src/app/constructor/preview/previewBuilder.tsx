import React from 'react';
import { CategoryName } from '@/app/metaData';
import { TshirtPreview } from './tshirt';
import { CalendarPreview } from './calendar';

interface Props {
  type: `${CategoryName}`;
}

export const PreviewBuilder = ({ type }: Props) => {
  if (type === 'tshirts') {
    return <TshirtPreview />;
  }
  if (type === 'calendars') {
    return <CalendarPreview />;
  }

  return <div>PreviewBuilder</div>;
};
