export interface SingleList {
  Text: string;
  Icon: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}

export interface SingleUnitProps {
  attributes: {
    Title: string;
    slug: string;
    Model: string;
    amenities: {
      List: SingleList[];
    };
    Hero_Media: {
      data: {
        attributes: {
          url: string;
          alternativeText: string;
        };
      };
    };
  };
}
export interface UnitsProps {
  Title: string;
  Description: string;
  units: {
    data: SingleUnitProps[];
  };
}
