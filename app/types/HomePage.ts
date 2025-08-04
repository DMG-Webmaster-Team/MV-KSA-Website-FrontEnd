export interface WidgetProps {
  Description: string;
  Title: string;
  Tagline: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}
export interface LogoProps {
  Link: string;
  Icon: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}
export interface LaunchingProps {
  ButtonOneLink: string;
  ButtonOneText: string;
  ButtonTwoLink: string;
  ButtonTwoText: string;
  Tagline: string;
  Title: string;
  Title2: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
}
export interface BoxProps {
  Buttonlink: string;
  Description: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Logo: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  Tagline: string;
  Title: string;
}