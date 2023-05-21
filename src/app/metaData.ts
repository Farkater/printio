type Selector = "file" | "color" | "boolean" | "space" | "sizeInputGroup";

type Option = {
  title: string;
  placeholder?: string;
  data: string[] | `${Selector}`;
  props?: any;
};

type Options = {
  [key: string]: Option;
};

type Step = {
  title: string;
  description: string;
  options: Options;
};

type Category = {
  title: string;
  path: string;
  previewImage: string;
  steps: Step[];
};

type Categories = {
  [key: string]: Category;
};

export const categories: Categories = {
  calendars: {
    title: "Calendars",
    path: "browse/calendars",
    previewImage: "",
    steps: [
      {
        title: "Properties",
        description: "Choose properties",
        options: {
          types: {
            title: "Тип календаря",
            placeholder: "Выберите тип календаря",
            data: ["foldable", "pocket size", "magnet", "desk"],
          },
          weekStart: {
            title: "Week start",
            placeholder: "Choose starting day of the week",
            data: ["Monday", "Sunday"],
          },
          holidayInfo: {
            title: "Holidays info",
            placeholder: "Do you want holidays marked?",
            data: "boolean",
          },
          language: {
            title: "Language",
            placeholder: "In which language should calendar be?",
            data: ["en", "pl"],
          },
          pageMaterial: {
            title: "Choose page material",
            placeholder: "Choose material for base and pages",
            data: ["low density", "medium density", "high density"],
          },
          baseMaterial: {
            title: "Base material",
            placeholder: "Choose base material",
            data: ["wood", "plastic", "cardboard"],
          },
        },
      },
      {
        title: "Background",
        description: "Choose background",
        options: {
          file: {
            title: "Background as a picture",
            placeholder: "Upload your picture",
            data: "file",
          },
          color: {
            title: "Background as a color",
            placeholder: "Choose a color",
            data: "color",
          },
        },
      },
    ],
  },
  tshirts: {
    title: "T-shirts",
    path: "browse/tshirts",
    previewImage: "",
    steps: [
      {
        title: "Properties",
        description: "Choose properties",
        options: {
          Sex: {
            title: "Sex",
            placeholder: "",
            data: ["male", "female", "unisex"],
          },
          size: {
            title: "Size",
            placeholder: "Choose size",
            data: ["xs", "s", "m", "l", "xl", "xxl"],
          },
          printingTech: {
            title: "Printing technology",
            placeholder: "Choose technology you want T-shirts to be made with",
            data: ["screen printing", "direct to garment", "direct to film"],
          },
        },
      },
      {
        title: "Print",
        description: "Chose print",
        options: {
          file: {
            title: "Custom",
            placeholder: "Upload your file",
            data: "file",
          },
          color: {
            title: "Color",
            placeholder: "Choose color of T-shirt",
            data: "color",
          },
        },
      },
    ],
  },
  bags: {
    title: "Paper bags",
    path: "browse/bags",
    previewImage: "",
    steps: [
      {
        title: "Material",
        description: "Choose material",
        options: {
          material: {
            title: "Material",
            placeholder: "Choose material for bags",
            // TODO Material dependant color selection
            data: [
              "Unbleached kraft paper (no color picking)",
              "Bleached kraft paper (no color picking)",
              "Black kraft paper (no color picking)",
              "Colored kraft paper",
              "Duplex paper",
            ],
          },
          size: {
            title: "Size",
            placeholder: "Enter size",
            data: "sizeInputGroup",
          },
          finish: {
            title: "Finish",
            placeholder: "Choose finish for the surface",
            data: ["Mate", "Glance"],
          },
          foil: {
            title: "Foil",
            placeholder: "Do you want foil on the surface?",
            data: "boolean",
          },
        },
      },
      {
        title: "Parameters",
        description: "Choose parameters of a bag",
        options: {
          colorOut: {
            title: "Outside color",
            placeholder: "Choose color for the outside",
            data: "color",
          },
          colorIn: {
            title: "Inside color",
            placeholder: "Choose color for the inside",
            data: "color",
          },
          handleType: {
            title: "Handle",
            placeholder: "Choose handle option",
            data: ["Paper handles", "Rope handles"],
          },
          bottomCardboard: {
            title: "Bottom reinforcement",
            placeholder: "Do you want cardboard bottom reinforcement?",
            data: "boolean",
          },
        },
      },
    ],
  },
  stickers: {
    title: "Stickers",
    path: "browse/stickers",
    previewImage: "",
    steps: [
      {
        title: "Parameters",
        description: "Choose parameters",
        options: {
          size: {
            title: "Size",
            placeholder:
              "Enter size, for shape different from rectangle please consider outer points as a rectangle wall",
            data: "sizeInputGroup",
          },
        },
      },
    ],
  },
  posters: {
    title: "Posters",
    path: "browse/posters",
    previewImage: "",
    steps: [
      {
        title: "Parameters",
        description: "Choose parameters",
        options: {
          size: {
            title: "Size",
            placeholder: "Enter size",
            data: "sizeInputGroup",
          },
        },
      },
    ],
  },
};
