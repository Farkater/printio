'use client';
import { useRouter } from 'next/navigation';
import { Title, createStyles, getStylesRef } from '@mantine/core';
import * as M from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { categories, CategoryName } from '@/app/metaData';

interface Props {
  params: { category: CategoryName };
}

export default function Category({ params }: Props) {
  const { categoryName, previewImage } = categories[params.category];
  const router = useRouter();

  const useStyles = createStyles(() => ({
    controls: {
      ref: getStylesRef('controls'),
      transition: 'opacity 150ms ease',
      opacity: 0,
    },

    root: {
      '&:hover': {
        [`& .${getStylesRef('controls')}`]: {
          opacity: 1,
        },
      },
    },
  }));
  const { classes } = useStyles();

  const handleOrder = () => {
    router.push(`/constructor/${params.category}`);
  };

  return (
    <>
      <Title>{categoryName}</Title>
      <M.Grid mt='lg' gutter={5}>
        <M.Col md={6} lg={6}>
          <Carousel maw={600} mx='auto' withIndicators loop classNames={classes}>
            <Carousel.Slide>
              <M.Image src={`/${categoryName}-1.webp`} withPlaceholder />
            </Carousel.Slide>
            <Carousel.Slide>
              <M.Image src={`/${categoryName}-2.webp`} withPlaceholder />
            </Carousel.Slide>
            <Carousel.Slide>
              <M.Image src={`/${categoryName}-3.webp`} withPlaceholder />
            </Carousel.Slide>
            <Carousel.Slide>
              <M.Image src={`/${categoryName}-4.webp`} withPlaceholder />
            </Carousel.Slide>
          </Carousel>
        </M.Col>
        <M.Col md={6} lg={6}>
          <M.Container>
            <Title>Lorem ipsum dolor sit amet consectetur</Title>
            <M.Text
              fz='lg'
              mt='lg'
              sx={{
                wordBreak: 'break-word',
              }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio assumenda est laboriosam tenetur,
              libero quae sunt illo dolore recusandae necessitatibus laborum obcaecati praesentium amet provident magni
              possimus. Iste, nulla ducimus.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
              assumenda est laboriosam tenetur, libero quae sunt illo dolore recusandae necessitatibus laborum obcaecati
              praesentium amet provident magni possimus. Iste, nulla ducimus.
            </M.Text>
            <M.Button
              mt='lg'
              size='xl'
              variant='gradient'
              gradient={{ from: 'teal', to: 'blue', deg: 60 }}
              onClick={handleOrder}
            >
              Order
            </M.Button>
          </M.Container>
        </M.Col>
      </M.Grid>
    </>
  );
}
