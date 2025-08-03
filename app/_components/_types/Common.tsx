export interface ImageData {
  url: string;
  alternativeText: string | null;
}

export interface SingleFaq {
  attributes: {
    Question: string;
    Answer: string;
    faqs_type: {
      data: {
        attributes: {
          Title: string;
        };
      };
    };
  };
}

export interface CareerWidget {
  attributes: {
    Title: string;
    slug: string;
    department: {
      data: {
        attributes: {
          Name: string;
        };
      };
    };
    role_type: {
      data: {
        attributes: {
          Name: string;
        };
      };
    };
  };
}

export interface ImageData {
  url: string;
  alternativeText: string | null;
  width?: number;
  height?: number;
}
