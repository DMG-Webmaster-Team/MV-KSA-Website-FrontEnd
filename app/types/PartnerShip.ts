export interface PartnerShipProps {
    Title: string,
    Link: string,
    Logo: {
        data: {
            attributes: {
                url: string;
                alternativeText: string;
            };
        };
    }
}
export interface LandScapeProps {
  Buttonlink: string;
  Image: {
    data: {
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  };
  List: {
    Name: string;
  }[];
}