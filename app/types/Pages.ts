import { CareerWidget, HeroSectionProps, SingleFaq, siteMap } from "../_components/_types/Common";
import { OverviewSectionProps } from "../_components/CommonComp/OverviewSection";
import { Repeater } from "../_components/CommonComp/TextComp";
import { singleImage } from "../_components/Gallery";
import { BoxProps, LaunchingProps, LogoProps, WidgetProps } from "./HomePage";
import { LighthouseWidgetProps } from "./LighthouseWidget";
import { LandScapeProps, PartnerShipProps } from "./PartnerShip";
import { UnitsProps } from "./UnitWidget";

export interface CalendlyProps {
  data: {
    Label: string;
    Title: string;
    Calendly_Link: string;
  };
}
export interface CareersProps {
  data: {
    MainData: {
      Title: string;
      Description: string;
      ListTitle: string;
      HeroImage: {
        data: {
          attributes: {
            url: string;
            alternativeText: string;
          };
        };
      };
      OverviewSection: {
        Title: string;
        Description: string;
      };
    };
    AllCareersData: CareerWidget[];
  };
}
export interface ContactUsProps {
  data: {
    Title: string;
    Tagline: string;
    FormLabel: string;
    FormTitle: string;
    Hotline: string;
    Email: string;
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    List: {
      Name: string;
    }[];
  };
}
export interface FaqsProps {
  data: {
    MainData: {
      Title: string;
      Text: {
        Title: string;
        Description: string;
      };
    };
    FaqsData: SingleFaq[];
  };
}
//blogs
export interface BlogWidget {
  attributes: {
    Title: string;
    slug: string;
    publishedAt: string;
    blogs_type: {
      data: {
        attributes: {
          Name: string;
        };
      };
    };
    WidgetImage: {
      data: {
        attributes: {
          url: string;
          alternativeText: string | null;
        };
      };
    };
  };
}

export interface MediaCenterProps {
  data: {
    MainData: {
      Title: string;
    };
    Blogs: BlogWidget[];
  };
}
//home page
interface MainDataProps {
  HeroSection: HeroSectionProps;
  OverviewSection: string;
  NumbersList: {
    Title: string;
    Description: string;
  }[];
  BoxOne: BoxProps[];
  LaunchingSection: LaunchingProps;
  Widget: WidgetProps;
  Rewards: {
    Title: string;
    Logos: LogoProps[];
  };
}
export interface HomepageProps {
  data: {
    MainData: MainDataProps;
    Blogs: BlogWidget[];
  };
}

export interface LighthousePageProps {
  data: {
    HeroSection: HeroSectionProps;
    OverviewSection: OverviewSectionProps;
    Repeater: Repeater[];
    Whatweserve: {
      Title: string;
      Widgets: LighthouseWidgetProps[];
    };
  };
}
export interface ScienceOfHappinessPageProps {
  data: {
    HeroSection: HeroSectionProps;
    OverviewSection: OverviewSectionProps;
    TextSection: Repeater;
    Strategies: {
      Title: string;
      Image: {
        data: {
          attributes: {
            url: string;
            alternativeText: string;
          };
        };
      };
      Repeater: Repeater[];
    };
  };
}
export interface SingleProjectProps {
  data: {
    MainData: {
      slug: string;
      HeroSection: HeroSectionProps;
      OverviewSection: OverviewSectionProps;
      OverviewSection2: OverviewSectionProps;
      Widgets: WidgetProps[];
      PDF: {
        data: {
          attributes: {
            url: string;
            name: string;
          };
        };
      };
      Numbers: {
        Title: string;
        Description: string;
      }[];
      SiteMap: siteMap;
      Landscape: LandScapeProps;
      Units: UnitsProps;
      PartnerSection: PartnerShipProps;
      Gallery: { data: singleImage[] };
    };
  };
}