export interface ImageData {
  url: string;
  alternativeText: string | null;
  width?: number;
  height?: number;
}

type LanguageMap<T> = {
  en: T;
  de?: T;
};

interface HeroFeature {
  title: string;
}

interface AboutStat {
  counter: string;
  title: string;
}

interface ValuesRepeaterItem {
  image: string;
  title: string;
  subtitle: string;
}

interface HowItWorksStep {
  title: string;
  description: string;
}


interface ApiDataHomepage {
  hero_tagline: LanguageMap<string>;
  hero_title: LanguageMap<string>;
  hero_description: LanguageMap<string>;
  hero_features: LanguageMap<HeroFeature[]>;
  hero_button_text: LanguageMap<string>;
  hero_video: string;
  hero_image_1: string;
  hero_image_1_alt: LanguageMap<string>;
  hero_image_2: string;
  hero_image_2_alt: LanguageMap<string>;
  hero_text_between_image: LanguageMap<string | null>;
  hero_customers_count: string;
  hero_happy_customers_text: LanguageMap<string>;
  hero_customer: string[];
  about_tagline: LanguageMap<string>;
  about_stats: LanguageMap<AboutStat[]>;
  about_title: LanguageMap<string>;
  about_content: LanguageMap<string>;
  about_button: LanguageMap<string>;
  values_tagline: LanguageMap<string>;
  values_title: LanguageMap<string>;
  values_subtitle: LanguageMap<string>;
  values_button: LanguageMap<string>;
  values_repeater: LanguageMap<ValuesRepeaterItem[]>;
  how_it_works_image: string;
  how_it_works_image_alt: LanguageMap<string>;
  how_it_works_title: LanguageMap<string>;
  how_it_works_subtitle: LanguageMap<string>;
  how_it_works_steps: LanguageMap<HowItWorksStep[]>;
  how_it_works_button: LanguageMap<string>;
  reviews_title: LanguageMap<string>;
  reviews_subtitle: LanguageMap<string>;
  faqs_title: LanguageMap<string>;
  faqs_subtitle: LanguageMap<string>;
  faqs_image: string;
  faqs_image_alt: LanguageMap<string>;
  faqs_button: LanguageMap<string>;
  contact_tagline: LanguageMap<string>;
  contact_title: LanguageMap<string>;
  contact_desc: LanguageMap<string>;
  contact_image: string;
  contact_image_alt: LanguageMap<string>;
  contact_button: LanguageMap<string>;

  seo_title: LanguageMap<string | null>;
  seo_description: LanguageMap<string | null>;
  seo_keyword: LanguageMap<string | null>;
  og_image: string | null;
}

export interface AwarenessApiResponse {
  success: boolean;
  msg: string;
  data: ApiDataHomepage;
}


export interface SingleFaq {
  question: string,
  answer: string,
  categories: string[]
}

export interface SingleReview {
  review: string,
  image: string,
  client: string,
  country: string,
  rate: number
}

export interface SingleMenu {
  title: string,
  link: string
}
export interface HeaderData {
  data: {
    header_logo: string,
    header_menu: LanguageMap<SingleMenu[]>,
    enable_top_bar: boolean,
    top_bar_text: LanguageMap<string | null>
  }

}

export interface SingleStats {
  counter: string,
  name: string
}

export interface SingleStep {
  title: string,
  description: string
}
interface ApiAboutusData {
  hero_tagline: LanguageMap<string>;
  hero_title: LanguageMap<string>;
  hero_content: LanguageMap<string>;
  hero_stats:LanguageMap<SingleStats[]>;
  hero_left_image:string;
  hero_left_image_alt:LanguageMap<string>;
  hero_right_image:string;
  hero_right_image_alt:LanguageMap<string>;
  hero_button:LanguageMap<string>;
  story_title:LanguageMap<string>;
  story_content:LanguageMap<string>;
  mission_title:LanguageMap<string>;
  mission_content:LanguageMap<string>;
  vision_title:LanguageMap<string>;
  vision_content:LanguageMap<string>;
  mission_vision_image:string;
  mission_vision_image_alt:LanguageMap<string>;
  how_it_works_title:LanguageMap<string>;
  how_it_works_subtitle:LanguageMap<string>;
  how_it_works_steps:LanguageMap<SingleStep[]>;
  how_it_works_image:string;
  how_it_works_image_alt:LanguageMap<string>;
  how_it_works_button:LanguageMap<string>;
  faqs_title:LanguageMap<string>;
  faqs_subtitle:LanguageMap<string>;
  faqs_image:string;
  faqs_image_alt:LanguageMap<string>;
  faqs_button:LanguageMap<string>;
  contact_tagline:LanguageMap<string>;
  contact_title:LanguageMap<string>;
  contact_desc:LanguageMap<string>;
  contact_image:string;
  contact_image_alt:LanguageMap<string>;
  contact_button:LanguageMap<string>;
}

export interface AboutusaResponse {
  success: boolean;
  msg: string;
  data: ApiAboutusData;
}