export interface ImageData {
  url: string;
  alternativeText: string | null;
}


export interface SingleFaq {
  attributes: {
    Question: string
    Answer: string
    faqs_type: {
      data: {
        attributes: {
          Title: string
        }
      }
    }
  }
}