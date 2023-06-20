type Selector = 'file' | 'color' | 'boolean' | 'space' | 'sizeInputGroup';

export type Option = {
  label: string;
  description?: string;
  placeholder?: string;
  data: string[] | `${Selector}`;
  props?: any;
};

type Options = {
  [key: string]: Option;
};

type Step = {
  stepTitle: string;
  stepDescription: string;
  options: Options;
};

type Category = {
  categoryName: string;
  path: string;
  steps: Step[];
  previewImage: string;
};
type CategoryName = 'calendars' | 'tshirts' | 'bags' | 'stickers' | 'posters';

type Categories = {
  [key in CategoryName]: Category;
};

export const categories: Categories = {
  calendars: {
    categoryName: 'Calendars',
    path: 'browse/calendars',
    previewImage: '',
    steps: [
      {
        stepTitle: 'Properties',
        stepDescription: 'Choose properties',
        options: {
          calendarTypes: {
            label: 'Тип календаря',
            description: 'Выберите тип календаря',
            data: ['foldable', 'pocket size', 'magnet', 'desk'],
          },
          weekStart: {
            label: 'Week start',
            description: 'Choose starting day of the week',
            data: ['Monday', 'Sunday'],
          },
          holidayInfo: {
            label: 'Holidays info',
            description: 'Do you want holidays marked?',
            data: 'boolean',
          },
          language: {
            label: 'Language',
            description: 'In which language should calendar be?',
            data: ['en', 'pl'],
          },
          pageMaterial: {
            label: 'Choose page material',
            description: 'Choose material for base and pages',
            data: ['low density', 'medium density', 'high density'],
          },
          baseMaterial: {
            label: 'Base material',
            description: 'Choose base material',
            data: ['wood', 'plastic', 'cardboard'],
          },
        },
      },
      {
        stepTitle: 'Background',
        stepDescription: 'Choose background',
        options: {
          file: {
            label: 'Background as a picture',
            description: 'Upload your picture',
            data: 'file',
          },
          color: {
            label: 'Background as a color',
            description: 'Choose a color',
            data: 'color',
          },
        },
      },
    ],
  },
  tshirts: {
    categoryName: 'T-shirts',
    path: 'browse/tshirts',
    previewImage: '',
    steps: [
      {
        stepTitle: 'Properties',
        stepDescription: 'Choose properties',
        options: {
          Sex: {
            label: 'Sex',
            description: '',
            data: ['male', 'female', 'unisex'],
          },
          size: {
            label: 'Size',
            description: 'Choose size',
            data: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
          },
          printingTech: {
            label: 'Printing technology',
            description: 'Choose technology you want T-shirts to be made with',
            data: ['screen printing', 'direct to garment', 'direct to film'],
          },
        },
      },
      {
        stepTitle: 'Print',
        stepDescription: 'Chose print',
        options: {
          file: {
            label: 'Custom',
            description: 'Upload your file',
            data: 'file',
          },
          color: {
            label: 'Color',
            description: 'Choose color of T-shirt',
            data: 'color',
          },
        },
      },
    ],
  },
  bags: {
    categoryName: 'Paper bags',
    path: 'browse/bags',
    previewImage: '',
    steps: [
      {
        stepTitle: 'Material',
        stepDescription: 'Choose material',
        options: {
          material: {
            label: 'Material',
            description: 'Choose material for bags',
            // TODO Material dependant color selection
            data: [
              'Unbleached kraft paper (no color picking)',
              'Bleached kraft paper (no color picking)',
              'Black kraft paper (no color picking)',
              'Colored kraft paper',
              'Duplex paper',
            ],
          },
          size: {
            label: 'Size',
            description: 'Enter size',
            data: 'sizeInputGroup',
          },
          finish: {
            label: 'Finish',
            description: 'Choose finish for the surface',
            data: ['Mate', 'Glance'],
          },
          foil: {
            label: 'Foil',
            description: 'Do you want foil on the surface?',
            data: 'boolean',
          },
        },
      },
      {
        stepTitle: 'Parameters',
        stepDescription: 'Choose parameters of a bag',
        options: {
          colorOut: {
            label: 'Outside color',
            description: 'Choose color for the outside',
            data: 'color',
          },
          colorIn: {
            label: 'Inside color',
            description: 'Choose color for the inside',
            data: 'color',
          },
          handleType: {
            label: 'Handle',
            description: 'Choose handle option',
            data: ['Paper handles', 'Rope handles'],
          },
          bottomCardboard: {
            label: 'Bottom reinforcement',
            description: 'Do you want cardboard bottom reinforcement?',
            data: 'boolean',
          },
        },
      },
    ],
  },
  stickers: {
    categoryName: 'Stickers',
    path: 'browse/stickers',
    previewImage: '',
    steps: [
      {
        stepTitle: 'Parameters',
        stepDescription: 'Choose parameters',
        options: {
          size: {
            label: 'Size',
            description:
              'Enter size, for shape different from rectangle please consider outer points as a rectangle wall',
            data: 'sizeInputGroup',
          },
        },
      },
    ],
  },
  posters: {
    categoryName: 'Posters',
    path: 'browse/posters',
    previewImage: '',
    steps: [
      {
        stepTitle: 'Parameters',
        stepDescription: 'Choose parameters',
        options: {
          size: {
            label: 'Size',
            description: 'Enter size',
            data: 'sizeInputGroup',
          },
        },
      },
    ],
  },
};
